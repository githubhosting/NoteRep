import React, { useState, useEffect } from 'react'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from '@/firebaseconfig'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore/lite'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getOrCreateUserId, generateRandomUsername } from '@/utils/user'
import { Mail, Phone, Globe } from 'lucide-react'

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
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null)
  const [confirmationResult, setConfirmationResult] = useState(null)

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
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (loginMethod === 'phone' && !recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      )
      setRecaptchaVerifier(verifier)
    }
  }, [loginMethod])

  const handleUserData = async (user) => {
    const deviceId = getOrCreateUserId()
    const userRef = doc(db, 'sisusers', user.uid)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()
      console.log('Existing user data:', userData)
    } else {
      await setDoc(userRef, {
        id: user.uid,
        displayName: user.displayName || 'User',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        deviceId: deviceId,
        createdAt: new Date().toISOString(),
        isAdmin: false, // Default to non-admin
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
      // Always assign a random username to ensure anonymity by default
      const randomName = generateRandomUsername()
      await updateProfile(user, { displayName: randomName })
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
        // Always assign a random username to ensure anonymity by default
        const randomName = generateRandomUsername()
        await updateProfile(user, { displayName: randomName })
        setLoading(false)
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const user = result.user
        // Always assign a random username to ensure anonymity by default
        const randomName = generateRandomUsername()
        await updateProfile(user, { displayName: randomName })
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

  const handlePhoneLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      if (!confirmationResult) {
        const result = await signInWithPhoneNumber(
          auth,
          phone,
          recaptchaVerifier
        )
        setConfirmationResult(result)
        setLoading(false)
        toast.info('OTP sent to your phone. Please check and enter the code.')
      } else {
        const result = await confirmationResult.confirm(otp)
        const user = result.user
        // Always assign a random username to ensure anonymity by default
        const randomName = generateRandomUsername()
        await updateProfile(user, { displayName: randomName })
        setConfirmationResult(null)
        setOtp('')
        setLoading(false)
      }
    } catch (error) {
      console.error('Phone sign-in error:', error)
      toast.error('Error during Phone sign-in: ' + error.message)
      setError('Failed to sign in with Phone')
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img src="/icon-192x192.png" alt="NoteRep Logo" className="mx-auto h-16 w-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to NoteRep</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in or create an account</p>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
          <div className="flex justify-center mb-6">
            <button
              className={`mx-2 px-4 py-2 rounded-md font-medium transition-colors flex items-center ${
                loginMethod === 'google'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setLoginMethod('google')}
            >
              <Globe className="h-5 w-5 mr-2" />
              Google
            </button>
            <button
              className={`mx-2 px-4 py-2 rounded-md font-medium transition-colors flex items-center ${
                loginMethod === 'email'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setLoginMethod('email')}
            >
              <Mail className="h-5 w-5 mr-2" />
              Email
            </button>
            <button
              className={`mx-2 px-4 py-2 rounded-md font-medium transition-colors flex items-center ${
                loginMethod === 'phone'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setLoginMethod('phone')}
            >
              <Phone className="h-5 w-5 mr-2" />
              Phone
            </button>
          </div>

          {loginMethod === 'google' && (
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign in with Google'}
            </button>
          )}

          {loginMethod === 'email' && (
            <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); handleEmailLogin(); }}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {!isSigningUp && (
                <div className="text-sm text-right">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    onClick={() => toast.info('Forgot Password functionality will be implemented soon.')}
                    disabled={loading}
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                  disabled={loading}
                >
                  {loading
                    ? 'Loading...'
                    : isSigningUp
                    ? 'Sign Up with Email'
                    : 'Sign In with Email'}
                </button>
              </div>

              <div className="text-sm text-center">
                <span className="text-gray-600 dark:text-gray-400">
                  {isSigningUp ? 'Already have an account?' : 'Don’t have an account?'}
                </span>
                <button
                  type="button"
                  className="ml-1 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  onClick={toggleSignUp}
                  disabled={loading}
                >
                  {isSigningUp ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </form>
          )}

          {loginMethod === 'phone' && (
            <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); handlePhoneLogin(); }}>
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="phone-number" className="sr-only">Phone Number</label>
                  <input
                    id="phone-number"
                    name="phone"
                    type="tel"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Phone Number (e.g., +1234567890)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading || confirmationResult}
                  />
                </div>
                {confirmationResult && (
                  <div className="mt-4">
                    <label htmlFor="otp-code" className="sr-only">OTP Code</label>
                    <input
                      id="otp-code"
                      name="otp"
                      type="text"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                )}
              </div>
              <div id="recaptcha-container" className="flex justify-center"></div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                  disabled={loading}
                >
                  {loading
                    ? 'Loading...'
                    : confirmationResult
                    ? 'Verify OTP'
                    : 'Send OTP'}
                </button>
              </div>
            </form>
          )}

          {error && <div className="mt-4 text-center text-sm text-red-600 dark:text-red-400">{error}</div>}
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
