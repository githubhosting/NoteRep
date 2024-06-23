import React, { useState, useEffect } from 'react'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from '@/firebaseconfig'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  setDoc,
} from 'firebase/firestore/lite'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const provider = new GoogleAuthProvider()

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
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const userRef = doc(db, 'sisusers', user.uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()
        console.log('Existing user data:', userData)
      } else {
        await setDoc(userRef, {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
        })
        console.log('New user document written with ID:', user.uid)
      }

      setLoading(false)
    } catch (error) {
      console.error('Google sign-in error:', error)
      toast.error('Error during Google sign-in: ' + error.message)
      setError('Failed to sign in with Google')
      setLoading(false)
    }
  }

  return (
    <div className="bg-blue-50">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login with Google'}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  )
}

export default Login
