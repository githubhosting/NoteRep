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
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="container mx-auto max-w-md p-4">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Login to NoteRep Chat
        </h2>
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="mb-4 flex justify-center">
            <button
              className={`mx-1 rounded px-4 py-2 ${
                loginMethod === 'google'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setLoginMethod('google')}
            >
              Google
            </button>
            <button
              className={`mx-1 rounded px-4 py-2 ${
                loginMethod === 'email'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setLoginMethod('email')}
            >
              Email
            </button>
            <button
              className={`mx-1 rounded px-4 py-2 ${
                loginMethod === 'phone'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setLoginMethod('phone')}
            >
              Phone
            </button>
          </div>

          {loginMethod === 'google' && (
            <button
              className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login with Google'}
            </button>
          )}

          {loginMethod === 'email' && (
            <div className="mt-4">
              <input
                type="email"
                className="mb-3 w-full rounded border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <input
                type="password"
                className="mb-3 w-full rounded border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                onClick={handleEmailLogin}
                disabled={loading}
              >
                {loading
                  ? 'Loading...'
                  : isSigningUp
                  ? 'Sign Up with Email'
                  : 'Login with Email'}
              </button>
              <p className="mt-2 text-center text-sm">
                {isSigningUp
                  ? 'Already have an account?'
                  : 'Don’t have an account?'}{' '}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={toggleSignUp}
                  disabled={loading}
                >
                  {isSigningUp ? 'Login' : 'Sign Up'}
                </button>
              </p>
            </div>
          )}

          {loginMethod === 'phone' && (
            <div className="mt-4">
              <input
                type="tel"
                className="mb-3 w-full rounded border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Phone Number (e.g., +1234567890)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading || confirmationResult}
              />
              {confirmationResult && (
                <input
                  type="text"
                  className="mb-3 w-full rounded border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={loading}
                />
              )}
              <div id="recaptcha-container"></div>
              <button
                className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                onClick={handlePhoneLogin}
                disabled={loading}
              >
                {loading
                  ? 'Loading...'
                  : confirmationResult
                  ? 'Verify OTP'
                  : 'Send OTP'}
              </button>
            </div>
          )}

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
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
