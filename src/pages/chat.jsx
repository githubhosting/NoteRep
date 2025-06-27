import Head from 'next/head'
import { useEffect, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from '@/firebaseconfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { CompactHeader } from './noterepbot'
import { Button } from '@/components/Button'

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
    {
      id: 'general-anon',
      name: 'General',
      type: 'anonymous',
    },
    {
      id: 'off-topic',
      name: 'Off-Topic',
      type: 'anonymous',
    },
    {
      id: 'study-group',
      name: 'Study Group',
      type: 'anonymous',
    },
  ])
  const [initialized, setInitialized] = useState(false)
  const [activePageUsers, setActivePageUsers] = useState(0)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const initChatRooms = async () => {
      if (initialized) return;
      setInitialized(true);
      const chatRoomsRef = ref(db, 'chatRooms');
      onValue(
        chatRoomsRef,
        async (snapshot) => {
          const existingRooms = snapshot.val() || {};
          try {
            const roomDescriptions = {
              'general-anon': 'Discuss anything related to studies and campus life',
              'off-topic': 'Chat about anything outside academics',
              'study-group': 'Collaborate on assignments and projects',
            };
            for (const room of rooms) {
              if (!existingRooms[room.id]) {
                const roomRef = ref(db, `chatRooms/${room.id}`);
                const description = room.type === 'authenticated' 
                  ? 'General chat for authenticated users' 
                  : roomDescriptions[room.id] || 'General chat for everyone';
                await set(roomRef, {
                  name: room.name,
                  type: room.type,
                  description,
                  createdAt: Date.now(),
                });
                console.log(`Initialized room: ${room.name}`);
              }
            }
            console.log('Chat room initialization complete.');
          } catch (error) {
            console.error('Error initializing chat rooms:', error);
          }
        },
        { onlyOnce: true }
      );
    };
    initChatRooms();
  }, [initialized, rooms])

  useEffect(() => {
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

    return () => {
      unsubscribeAuth()
    }
  }, [])

  return (
    <ChatContext.Provider
      value={{
        rooms,
        activePageUsers,
        user,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

function ChatRoomList({ rooms, activePageUsers }) {
  const router = useRouter();
  const [roomDetails, setRoomDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Fetch room details from Firebase to display active users per room
    const roomDetailsListener = {};
    rooms.forEach((room) => {
      const roomRef = ref(db, `chatRooms/${room.id}`);
      roomDetailsListener[room.id] = onValue(roomRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setRoomDetails((prev) => ({ ...prev, [room.id]: data }));
        }
        setIsLoading(false);
      });
    });
    return () => {
      Object.values(roomDetailsListener).forEach((unsubscribe) => unsubscribe());
      setIsLoading(false);
    };
  }, [rooms]);

  return (
    <div className="w-full border-b border-gray-300 bg-gradient-to-r from-blue-100 to-indigo-100 p-6 dark:border-gray-700 dark:from-blue-900 dark:to-indigo-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          NoteRep Chat Rooms
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Active Users: <span className="font-semibold">{activePageUsers}</span>
        </p>
      </div>
      {isLoading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          Loading chat rooms...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <button
              key={room.id}
              className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-700 dark:text-white dark:hover:shadow-lg"
              onClick={() => router.push(`/chat/${room.id}`)}
            >
              <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {room.name}
              </span>
              <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {roomDetails[room.id]?.description || "Join this chat room!"}
              </span>
              <div className="mt-2 flex justify-center text-xs text-gray-500 dark:text-gray-400">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-800 dark:bg-green-900 dark:text-green-300">
                  {roomDetails[room.id]?.activeUsers
                    ? Object.keys(roomDetails[room.id].activeUsers).length
                    : 0}{' '}
                  Online
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChatWindow({ user }) {
  const router = useRouter();
  const isAuthenticated = !!user;

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center bg-gray-50 p-8 dark:bg-gray-800">
      <div className="max-w-md text-center">
        <h3 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome to NoteRep Chat
        </h3>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
          Connect with fellow students, discuss topics, and collaborate in real-time. Select a chat room above to get started.
        </p>
        {!isAuthenticated ? (
          <div className="mt-6 animate-fade-in">
            <p className="mb-4 text-base text-gray-500 dark:text-gray-400">
              Sign in to unlock full chat features and join the conversation.
            </p>
            <Button
              onClick={handleLoginRedirect}
              className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Login Now
            </Button>
          </div>
        ) : (
          <p className="mt-6 text-base text-gray-500 dark:text-gray-400">
            You are logged in. Start chatting now!
          </p>
        )}
      </div>
    </div>
  );
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
          <div className="container mx-auto flex max-w-5xl flex-1 flex-col p-4">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
              NoteRep Live Chat
            </h1>
            <ChatProvider>
              <ChatContext.Consumer>
                {({ rooms, activePageUsers, user }) => (
                  <div className="flex h-[85vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                    <ChatRoomList
                      rooms={rooms}
                      activePageUsers={activePageUsers}
                    />
                    <ChatWindow user={user} />
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
