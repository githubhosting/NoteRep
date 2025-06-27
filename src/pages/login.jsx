import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Login from '@/components/Login'
import { CompactHeader } from './noterepbot'
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from '@/firebaseconfig'
import { Button } from '@/components/Button'

// Initialize Firebase if not already done
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const auth = getAuth()

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [newUsername, setNewUsername] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleGoToChat = () => {
    router.push('/chat')
  }

  const handleEditUsername = async () => {
    if (newUsername.trim() && user) {
      try {
        await updateProfile(user, { displayName: newUsername })
        setUser({ ...user, displayName: newUsername })
        setIsEditingUsername(false)
        setNewUsername('')
      } catch (error) {
        console.error('Error updating username:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-indigo-50 dark:bg-gray-900">
        <CompactHeader />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>NoteRep Chat - Profile & Login</title>
        <meta
          name="description"
          content="Manage your profile and login to engage in real-time chat with other students on NoteRep"
        />
        <meta name="theme-color" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="noterep, chat, student chat, real-time chat, login, profile"
        />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <main className="flex min-h-screen flex-col bg-indigo-50 dark:bg-gray-900">
        <CompactHeader />
        <section className="flex flex-1 flex-col py-3 sm:py-10">
          {user ? (
            <div className="container mx-auto max-w-md p-4">
              <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
                Profile
              </h2>
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="mb-4">
                  <div className="flex items-center">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      Username:{' '}
                      <span className="font-normal">
                        {user.displayName || 'User'}
                      </span>
                    </p>
                    <button
                      onClick={() => setIsEditingUsername(true)}
                      className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                  {user.email && (
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      Email: <span className="font-normal">{user.email}</span>
                    </p>
                  )}
                  {user.phoneNumber && (
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      Phone:{' '}
                      <span className="font-normal">{user.phoneNumber}</span>
                    </p>
                  )}
                </div>
                {isEditingUsername && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                        Edit Username
                      </h3>
                      <input
                        type="text"
                        className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter new username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
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
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleGoToChat}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Go to Chat
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
                  >
                    Logout
                  </Button>
                </div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  More profile management features coming soon...
                </p>
              </div>
            </div>
          ) : (
            <Login onLogin={handleLogin} setUser={setUser} />
          )}
        </section>
      </main>
    </>
  )
}
