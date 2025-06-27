import Head from 'next/head'
import { useEffect, useState, useContext, createContext, useRef } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { getOrCreateUserId } from '@/utils/user'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from '@/firebaseconfig'
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  onDisconnect,
  serverTimestamp,
} from 'firebase/database'

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
  currentRoom: null,
  messages: [],
  activeUsers: [],
  setCurrentRoom: () => {},
  sendMessage: () => {},
})

function ChatProvider({ children }) {
  const [rooms, setRooms] = useState([
    { id: 'general-auth', name: 'General (Authenticated)', type: 'authenticated' },
    { id: 'general-anon', name: 'General (Anonymous)', type: 'anonymous' },
  ])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Initialize chat rooms in the database if not already done
    const initChatRooms = async () => {
      const chatRoomsRef = ref(db, 'chatRooms')
      onValue(chatRoomsRef, async (snapshot) => {
        if (!snapshot.exists() && !initialized) {
          setInitialized(true)
          try {
            for (const room of rooms) {
              const roomRef = ref(db, `chatRooms/${room.id}`)
              await set(roomRef, {
                name: room.name,
                type: room.type,
                description: room.type === 'authenticated' ? 'General chat for authenticated users' : 'General chat for everyone',
                createdAt: Date.now()
              })
              console.log(`Initialized room: ${room.name}`)
            }
            console.log('All chat rooms initialized successfully.')
          } catch (error) {
            console.error('Error initializing chat rooms:', error)
          }
        }
      }, { onlyOnce: true })
    }
    initChatRooms()
  }, [initialized])
  const [currentRoom, setCurrentRoom] = useState(null)
  const [messages, setMessages] = useState([])
  const [activeUsers, setActiveUsers] = useState([])
  const [activePageUsers, setActivePageUsers] = useState(0)
  const [user, setUser] = useState(null)
  const [deviceId, setDeviceId] = useState(null)

  useEffect(() => {
    // Get or create device ID for anonymous tracking
    const id = getOrCreateUserId()
    setDeviceId(id)

    // Monitor authentication state
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    // Track active users on the chat page
    const activeUsersRef = ref(db, 'chat/activePageUsers')
    onValue(activeUsersRef, (snapshot) => {
      const count = snapshot.val() ? Object.keys(snapshot.val()).length : 0
      setActivePageUsers(count)
    })

    // Set up presence for the current device/user
    const userPresenceRef = ref(db, `chat/activePageUsers/${id}`)
    set(userPresenceRef, { timestamp: serverTimestamp() })
    onDisconnect(userPresenceRef).remove()

    return () => {
      unsubscribeAuth()
      set(userPresenceRef, null)
    }
  }, [])

  useEffect(() => {
    if (!currentRoom) return

    // Track presence in the current room
    const userId = user ? user.uid : deviceId
    const userName = user ? user.displayName : `Anonymous-${deviceId.slice(0, 5)}`
    const roomPresenceRef = ref(db, `chatRooms/${currentRoom.id}/activeUsers/${userId}`)
    set(roomPresenceRef, { name: userName, timestamp: serverTimestamp() })
    onDisconnect(roomPresenceRef).remove()

    // Listen for active users in the room
    const activeUsersRef = ref(db, `chatRooms/${currentRoom.id}/activeUsers`)
    onValue(activeUsersRef, (snapshot) => {
      const usersData = snapshot.val() || {}
      const usersList = Object.values(usersData)
      setActiveUsers(usersList)
    })

    // Listen for messages in the room
    const messagesRef = ref(db, `chatRooms/${currentRoom.id}/messages`)
    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val() || {}
      const messagesList = Object.values(messagesData)
      setMessages(messagesList)
    })

    return () => {
      set(roomPresenceRef, null)
    }
  }, [currentRoom, user, deviceId])

  const sendMessage = (text) => {
    if (!currentRoom || !text) return

    const userId = user ? user.uid : deviceId
    const userName = user ? user.displayName : `Anonymous-${deviceId.slice(0, 5)}`
    const messagesRef = ref(db, `chatRooms/${currentRoom.id}/messages`)
    const newMessageRef = push(messagesRef)
    set(newMessageRef, {
      userId,
      userName,
      text,
      timestamp: serverTimestamp(),
    })
  }

  return (
    <ChatContext.Provider
      value={{
        rooms,
        currentRoom,
        messages,
        activeUsers,
        activePageUsers,
        setCurrentRoom,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

function ChatRoomList({ rooms, currentRoom, setCurrentRoom, activePageUsers }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-300 p-4 dark:border-gray-700">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Chat Rooms</h2>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Active users on page: {activePageUsers}
      </p>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li
            key={room.id}
            className={`cursor-pointer rounded p-2 flex items-center justify-between ${
              currentRoom?.id === room.id ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            onClick={() => {
              if (room.type === 'authenticated' && !user) {
                alert('Please log in with Google to access this room.')
                return
              }
              setCurrentRoom(room)
            }}
          >
            <span className="text-gray-900 dark:text-white">{room.name}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              room.type === 'authenticated' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              {room.type === 'authenticated' ? 'Authenticated (Coming Soon)' : 'Anonymous'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ChatWindow({ currentRoom, messages, activeUsers, sendMessage }) {
  const [messageText, setMessageText] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(messageText)
      setMessageText('')
    }
  }

  if (!currentRoom) {
    return (
      <div className="flex w-full md:w-3/4 flex-col items-center justify-center p-4">
        <p className="text-gray-500 dark:text-gray-400">Select a room to start chatting</p>
      </div>
    )
  }

  return (
    <div className="flex w-full md:w-3/4 flex-col p-4 h-[calc(100vh-200px)] md:h-auto">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        {currentRoom.name}
      </h2>
      <div className="mb-4 flex-1 overflow-y-auto rounded border border-gray-300 p-2 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {msg.userName} - {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
            <p className="text-gray-900 dark:text-white">{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active in Room:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {activeUsers.map((user, index) => (
            <div key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
              {user.name}
            </div>
          ))}
        </div>
      </div>
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
        <meta name="keywords" content="noterep, chat, student chat, real-time chat" />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <Header />
      <main className="min-h-screen bg-indigo-50 dark:bg-gray-900">
        <section className="py-7 pb-10 sm:py-10">
          <div className="container mx-auto p-4">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
              NoteRep Chat
            </h1>
            <ChatProvider>
              <ChatContext.Consumer>
                {({
                  rooms,
                  currentRoom,
                  messages,
                  activeUsers,
                  activePageUsers,
                  setCurrentRoom,
                  sendMessage,
                }) => (
                  <div className="flex flex-col md:flex-row rounded-lg bg-white shadow-lg dark:bg-gray-800 min-h-[70vh]">
                    <ChatRoomList
                      rooms={rooms}
                      currentRoom={currentRoom}
                      setCurrentRoom={setCurrentRoom}
                      activePageUsers={activePageUsers}
                    />
                    <ChatWindow
                      currentRoom={currentRoom}
                      messages={messages}
                      activeUsers={activeUsers}
                      sendMessage={sendMessage}
                    />
                  </div>
                )}
              </ChatContext.Consumer>
            </ChatProvider>
          </div>
        </section>
      </main>
      <Footer />
      {showButton && (
        <button onClick={scrollToTop} className="back-to-top shadow-lg">
          <span>↑</span>
        </button>
      )}
    </>
  )
}
