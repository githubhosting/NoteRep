import React, { useState, useEffect } from 'react'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from '@/firebaseconfig'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore/lite'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getOrCreateUserId, generateRandomUsername } from '@/utils/user'
import { Mail, Globe } from 'lucide-react'

const googleProvider = new GoogleAuthProvider()

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const auth = getAuth()
const db = getFirestore()

function Login({ onLogin, setUser }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loginMethod, setLoginMethod] = useState('google')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningUp, setIsSigningUp] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setIsLoggedIn(true)
        handleUserData(user)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
    })

    // Check for theme preference
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    return () => unsubscribe()
  }, [])

    const handleUserData = async (user) => {
    const deviceId = getOrCreateUserId()
    const userRef = doc(db, 'sisusers', user.uid)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()
      console.log('Existing user data:', userData)
    } else {
      let randomUsername = localStorage.getItem('randomUsername');
      if (!randomUsername) {
        try {
          randomUsername = typeof getOrCreateRandomUsername === 'function' ? getOrCreateRandomUsername() : generateRandomUsername();
        } catch (e) {
          console.error('Error getting random username:', e);
          randomUsername = generateRandomUsername();
        }
      }
      await setDoc(userRef, {
        id: user.uid,
        displayName: user.displayName || 'User',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        deviceId: deviceId,
        trackingUsername: randomUsername,
        createdAt: new Date().toISOString(),
        isAdmin: false // Default to non-admin
      })
      console.log('New user document written with ID:', user.uid)
    }
    if (typeof onLogin === 'function') {
      onLogin(user)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      // Assign a random username only if no display name is set to preserve existing names
      if (!user.displayName || user.displayName === 'User') {
        const randomName = generateRandomUsername()
        await updateProfile(user, { displayName: randomName })
      }
      setLoading(false)
    } catch (error) {
      console.error('Google sign-in error:', error)
      toast.error('Error during Google sign-in: ' + error.message)
      setError('Failed to sign in with Google')
      setLoading(false)
    }
  }

  const handleEmailLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      if (isSigningUp) {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        const user = result.user
        // Assign a random username only if no display name is set to preserve existing names
        if (!user.displayName || user.displayName === 'User') {
          const randomName = generateRandomUsername()
          await updateProfile(user, { displayName: randomName })
        }
        setLoading(false)
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const user = result.user
        // Assign a random username only if no display name is set to preserve existing names
        if (!user.displayName || user.displayName === 'User') {
          const randomName = generateRandomUsername()
          await updateProfile(user, { displayName: randomName })
        }
        setLoading(false)
      }
    } catch (error) {
      console.error('Email sign-in error:', error)
      toast.error('Error during Email sign-in: ' + error.message)
      setError(
        isSigningUp
          ? 'Failed to create account'
          : 'Failed to sign in with Email'
      )
      setLoading(false)
    }
  }

  const toggleSignUp = () => {
    setIsSigningUp(!isSigningUp)
    setError(null)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img
            src="/icon-192x192.png"
            alt="NoteRep Logo"
            className="mx-auto mb-4 h-16 w-auto"
          />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to NoteRep
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in or create an account
          </p>
        </div>
        <div className="mt-8 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
          <div className="mb-6 flex justify-center">
            <button
              className={`mx-2 flex items-center rounded-md px-4 py-2 font-medium transition-colors ${
                loginMethod === 'google'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setLoginMethod('google')}
            >
              <Globe className="mr-2 h-5 w-5" />
              Google
            </button>
            <button
              className={`mx-2 flex items-center rounded-md px-4 py-2 font-medium transition-colors ${
                loginMethod === 'email'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setLoginMethod('email')}
            >
              <Mail className="mr-2 h-5 w-5" />
              Email
            </button>
          </div>

          {loginMethod === 'google' && (
            <button
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign in with Google'}
            </button>
          )}

          {loginMethod === 'email' && (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                handleEmailLogin()
              }}
            >
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {!isSigningUp && (
                <div className="text-right text-sm">
                  <button
                    type="button"
                    className="text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    onClick={() =>
                      toast.info(
                        'Forgot Password functionality will be implemented soon.'
                      )
                    }
                    disabled={loading}
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                  disabled={loading}
                >
                  {loading
                    ? 'Loading...'
                    : isSigningUp
                    ? 'Sign Up with Email'
                    : 'Sign In with Email'}
                </button>
              </div>

              <div className="text-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {isSigningUp
                    ? 'Already have an account?'
                    : 'Don’t have an account?'}
                </span>
                <button
                  type="button"
                  className="ml-1 text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  onClick={toggleSignUp}
                  disabled={loading}
                >
                  {isSigningUp ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </form>
          )}

          {error && (
            <div className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  )
}

export default Login
