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
  const [currentRoom, setCurrentRoom] = useState(rooms.find(room => room.type === 'anonymous') || null)

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
  }, [initialized, rooms])
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
    const userName = user ? user.displayName : (deviceId ? `Anonymous-${deviceId.slice(0, 5)}` : 'Anonymous')
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
    const userName = user ? user.displayName : (deviceId ? `Anonymous-${deviceId.slice(0, 5)}` : 'Anonymous')
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
    <div className="w-full p-6 border-b border-gray-300 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
      <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Chat Rooms</h2>
      <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
        Active users on page: <span className="font-semibold">{activePageUsers}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        {rooms.map((room) => (
          <button
            key={room.id}
            className={`flex items-center justify-between px-5 py-3 rounded-xl min-w-[160px] shadow-md transition-all duration-200 ${
              currentRoom?.id === room.id 
                ? 'bg-blue-500 dark:bg-blue-700 text-white border-2 border-blue-400 dark:border-blue-600 transform scale-105' 
                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-800'
            }`}
            onClick={() => {
              if (room.type === 'authenticated' && !user) {
                alert('Please log in with Google to access this room.')
                return
              }
              setCurrentRoom(room)
            }}
          >
            <span className="font-medium">{room.name.split(' ')[0]}</span>
            <span className={`text-xs px-3 py-1 rounded-full ${
              room.type === 'authenticated' 
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
            } ${currentRoom?.id === room.id ? 'bg-opacity-20' : ''}`}>
              {room.type === 'authenticated' ? 'Auth (Soon)' : 'Anon'}
            </span>
          </button>
        ))}
      </div>
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
      <div className="flex w-full flex-col items-center justify-center p-6 flex-1">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Select a room to start chatting</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col p-6 flex-1 min-h-0">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        {currentRoom.name}
      </h2>
      <div className="mb-6 flex-1 overflow-y-auto rounded-xl border border-gray-200 p-4 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-inner">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div key={index} className="mb-3 p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {msg.userName} - {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
                <p className="text-gray-900 dark:text-white mt-1">{msg.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <div className="flex gap-3">
        <input
          type="text"
          className="flex-1 rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button 
          onClick={handleSendMessage}
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium transition-colors"
        >
          Send
        </Button>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Active in Room:</h3>
        <div className="flex flex-wrap gap-3 mt-3">
          {activeUsers.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No active users in this room.</p>
          ) : (
            activeUsers.map((user, index) => (
              <div key={index} className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium shadow">
                {user.name}
              </div>
            ))
          )}
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
      <main className="min-h-screen bg-indigo-50 dark:bg-gray-900 overflow-hidden">
        <section className="py-7 sm:py-10 h-screen flex flex-col">
          <div className="container mx-auto p-4 flex-1 flex flex-col">
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
                  <div className="flex flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-800 h-[85vh] overflow-hidden">
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
      {showButton && (
        <button onClick={scrollToTop} className="back-to-top shadow-lg">
          <span>↑</span>
        </button>
      )}
    </>
  )
}
