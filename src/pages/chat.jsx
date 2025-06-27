import Head from 'next/head'
import { useEffect, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from '@/firebaseconfig'
import { getAuth } from 'firebase/auth'
import {
  getDatabase,
  ref,
  onValue,
  set,
} from 'firebase/database'
import { CompactHeader } from './noterepbot'

// Initialize Firebase if not already done
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const auth = getAuth()
const db = getDatabase()

// Chat Context for state management
const ChatContext = createContext({
  rooms: [],
  activePageUsers: 0,
})

function ChatProvider({ children }) {
  const [rooms, setRooms] = useState([
    { id: 'general-anon', name: 'General', type: 'anonymous' },
    { id: 'off-topic', name: 'Off-Topic', type: 'anonymous' },
    { id: 'study-group', name: 'Study Group', type: 'anonymous' },
  ])
  const [initialized, setInitialized] = useState(false)
  const [activePageUsers, setActivePageUsers] = useState(0)

  useEffect(() => {
    // Initialize chat rooms in the database if not already done
    const initChatRooms = async () => {
      if (initialized) return;
      setInitialized(true);
      const chatRoomsRef = ref(db, 'chatRooms')
      onValue(
        chatRoomsRef,
        async (snapshot) => {
          const existingRooms = snapshot.val() || {};
          try {
            for (const room of rooms) {
              if (!existingRooms[room.id]) {
                const roomRef = ref(db, `chatRooms/${room.id}`)
                await set(roomRef, {
                  name: room.name,
                  type: room.type,
                  description: room.type === 'authenticated'
                    ? 'General chat for authenticated users'
                    : 'General chat for everyone',
                  createdAt: Date.now(),
                })
                console.log(`Initialized room: ${room.name}`)
              }
            }
            console.log('All missing chat rooms initialized successfully.')
          } catch (error) {
            console.error('Error initializing chat rooms:', error)
          }
        },
        { onlyOnce: true }
      )
    }
    initChatRooms()
  }, [initialized, rooms])

  useEffect(() => {
    // Track active users on the chat page
    const activeUsersRef = ref(db, 'chat/activePageUsers')
    onValue(activeUsersRef, (snapshot) => {
      const count = snapshot.val() ? Object.keys(snapshot.val()).length : 0
      setActivePageUsers(count)
    })
  }, [])

  return (
    <ChatContext.Provider
      value={{
        rooms,
        activePageUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

function ChatRoomList({ rooms, activePageUsers }) {
  const router = useRouter()
  return (
    <div className="w-full border-b border-gray-300 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 dark:border-gray-700 dark:from-blue-900 dark:to-indigo-900">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          NoteRep Chat Rooms
        </h2>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          Active: <span className="font-semibold">{activePageUsers}</span>
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {rooms.map((room) => (
          <button
            key={room.id}
            className="flex min-w-[120px] items-center justify-center rounded-lg px-4 py-2 shadow transition-all duration-200 border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            onClick={() => router.push(`/chat/${room.id}`)}
          >
            <span className="text-sm font-medium">
              {room.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ChatWindow() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center p-6">
      <p className="text-lg text-gray-500 dark:text-gray-400">
        Select a room to start chatting
      </p>
    </div>
  )
}

export default function Chat() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Dark Mode
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.theme = 'light'
    localStorage.theme = 'dark'
    localStorage.removeItem('theme')
  }, [])

  return (
    <>
      <Head>
        <title>NoteRep Chat - Real-Time Chat for Students</title>
        <meta
          name="description"
          content="Engage in real-time chat with other students on NoteRep"
        />
        <meta name="theme-color" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="noterep, chat, student chat, real-time chat"
        />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <main className="flex min-h-screen flex-col bg-indigo-50 dark:bg-gray-900">
        <CompactHeader />
        <section className="flex h-screen flex-col py-3 sm:py-10">
          <div className="container mx-auto flex flex-1 flex-col p-4 max-w-5xl">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
              NoteRep Live Chat
            </h1>
            <ChatProvider>
              <ChatContext.Consumer>
                {({
                  rooms,
                  activePageUsers,
                }) => (
                  <div className="flex h-[85vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                    <ChatRoomList
                      rooms={rooms}
                      activePageUsers={activePageUsers}
                    />
                    <ChatWindow />
                  </div>
                )}
              </ChatContext.Consumer>
            </ChatProvider>
          </div>
        </section>
      </main>
    </>
  )
}
