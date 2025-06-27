import Head from 'next/head'
import { useEffect, useState, useContext, createContext, useRef } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/Button'
import { getOrCreateUserId } from '@/utils/user'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from '@/firebaseconfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  onDisconnect,
  serverTimestamp,
} from 'firebase/database'
import { CompactHeader } from '../noterepbot'

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
  currentRoom: null,
  messages: [],
  activeUsers: [],
  activePageUsers: 0,
  sendMessage: () => {},
})

function ChatProvider({ children, roomId }) {
  const [currentRoom, setCurrentRoom] = useState(null)
  const [messages, setMessages] = useState([])
  const [activeUsers, setActiveUsers] = useState([])
  const [activePageUsers, setActivePageUsers] = useState(0)
  const [user, setUser] = useState(null)
  const [deviceId, setDeviceId] = useState(null)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [newUsername, setNewUsername] = useState('')

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
    // Fetch room details based on roomId
    const roomRef = ref(db, `chatRooms/${roomId}`)
    const unsubscribeRoom = onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val()
      if (roomData) {
        setCurrentRoom({ id: roomId, ...roomData })
      }
    })

    return () => {
      unsubscribeRoom()
    }
  }, [roomId])

  useEffect(() => {
    if (!currentRoom) return

    // Track presence in the current room
    const userId = user ? user.uid : deviceId
    const userName = user
      ? user.displayName
      : deviceId
      ? `Anon-${deviceId.slice(0, 5)}`
      : 'Anonymous'
    const roomPresenceRef = ref(
      db,
      `chatRooms/${currentRoom.id}/activeUsers/${userId}`
    )
    set(roomPresenceRef, { name: userName, timestamp: serverTimestamp() })
    onDisconnect(roomPresenceRef).remove()

    // Listen for active users in the room
    const activeUsersRef = ref(db, `chatRooms/${currentRoom.id}/activeUsers`)
    const unsubscribeActiveUsers = onValue(activeUsersRef, (snapshot) => {
      const usersData = snapshot.val() || {}
      const usersList = Object.values(usersData)
      setActiveUsers(usersList)
    })

    // Listen for messages in the room
    const messagesRef = ref(db, `chatRooms/${currentRoom.id}/messages`)
    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val() || {}
      const messagesList = Object.values(messagesData)
      setMessages(messagesList)
    })

    return () => {
      set(roomPresenceRef, null)
      unsubscribeActiveUsers()
      unsubscribeMessages()
    }
  }, [currentRoom?.id, user, deviceId])

  const sendMessage = (text) => {
    if (!currentRoom || !text) return

    const userId = user ? user.uid : deviceId
    const userName = user
      ? user.displayName
      : deviceId
      ? `Anon-${deviceId.slice(0, 5)}`
      : 'Anonymous'
    const messagesRef = ref(db, `chatRooms/${currentRoom.id}/messages`)
    const newMessageRef = push(messagesRef)
    set(newMessageRef, {
      userId,
      userName,
      text,
      timestamp: serverTimestamp(),
    })
  }

  const handleEditUsername = async () => {
    if (newUsername.trim() && user) {
      try {
        await user.updateProfile({ displayName: newUsername })
        setUser({ ...user, displayName: newUsername })
        setIsEditingUsername(false)
        setNewUsername('')
      } catch (error) {
        console.error('Error updating username:', error)
      }
    }
  }

  return (
    <ChatContext.Provider
      value={{
        currentRoom,
        messages,
        activeUsers,
        activePageUsers,
        sendMessage,
        user,
        deviceId,
        isEditingUsername,
        setIsEditingUsername,
        newUsername,
        setNewUsername,
        handleEditUsername,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

function ChatWindow({ currentRoom, messages, activeUsers, sendMessage, user, deviceId, isEditingUsername, setIsEditingUsername, newUsername, setNewUsername, handleEditUsername }) {
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
      <div className="flex w-full flex-1 flex-col items-center justify-center p-6">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Loading chat room...
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col p-3">
      <div className="mb-4 p-3 rounded-lg bg-white shadow-sm dark:bg-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-900 dark:text-white">Your Username: </span>
            <span className="text-lg text-gray-700 dark:text-gray-300">{user ? user.displayName : deviceId ? `Anon-${deviceId.slice(0, 5)}` : 'Anonymous'}</span>
          </div>
          {user && (
            <button 
              onClick={() => setIsEditingUsername(true)} 
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Edit Username
            </button>
          )}
        </div>
        {isEditingUsername && user && (
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              className="flex-1 rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Enter new username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button
              onClick={handleEditUsername}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditingUsername(false)}
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="mb-6 flex-1 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-inner dark:border-gray-700 dark:bg-gray-800">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const isCurrentUser = user ? msg.userId === user.uid : msg.userId === deviceId;
              return (
                <div
                  key={index}
                  className={`mb-2 rounded-lg bg-white p-1.5 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-700 ${isCurrentUser ? 'border-2 border-blue-500 dark:border-blue-400' : ''}`}
                >
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {msg.userName} -{' '}
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                  <p className="mt-1 text-gray-900 dark:text-white">{msg.text}</p>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-xl border border-gray-300 bg-indigo-50 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button
          onClick={handleSendMessage}
          className="rounded-xl bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Send
        </Button>
      </div>
      <div className="mt-2 sm:mt-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
          Active Users @ {currentRoom.name}:
        </h3>
        <div className="mt-1 flex flex-wrap gap-1 sm:gap-2">
          {activeUsers.length === 0 ? (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              No active users.
            </p>
          ) : (
            activeUsers.map((user, index) => (
              <div
                key={index}
                className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-800 shadow-sm dark:bg-blue-900 dark:text-blue-300 sm:text-xs"
              >
                {user.name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default function ChatRoom() {
  const router = useRouter()
  const { id } = router.query
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
          <div className="container mx-auto flex max-w-5xl flex-1 flex-col p-4">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
              NoteRep Live Chat
            </h1>
            <ChatProvider roomId={id}>
              <ChatContext.Consumer>
                {({
                  currentRoom,
                  messages,
                  activeUsers,
                  activePageUsers,
                  sendMessage,
                  user,
                  deviceId,
                  isEditingUsername,
                  setIsEditingUsername,
                  newUsername,
                  setNewUsername,
                  handleEditUsername,
                }) => (
                  <div className="flex h-[85vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                    <div className="w-full border-b border-gray-300 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 dark:border-gray-700 dark:from-blue-900 dark:to-indigo-900">
                      <div className="mb-2 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                          {currentRoom ? currentRoom.name : 'Loading...'}
                        </h2>
                        <div className="flex items-center gap-4">
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            Active:{' '}
                            <span className="font-semibold">
                              {activePageUsers}
                            </span>
                          </p>
                          <button
                            onClick={() => router.push('/chat')}
                            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                          >
                            Back to Rooms
                          </button>
                        </div>
                      </div>
                    </div>
                    <ChatWindow
                      currentRoom={currentRoom}
                      messages={messages}
                      activeUsers={activeUsers}
                      sendMessage={sendMessage}
                      user={user}
                      deviceId={deviceId}
                      isEditingUsername={isEditingUsername}
                      setIsEditingUsername={setIsEditingUsername}
                      newUsername={newUsername}
                      setNewUsername={setNewUsername}
                      handleEditUsername={handleEditUsername}
                    />
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
