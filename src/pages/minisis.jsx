import React, { useState, useEffect } from 'react'
import Login from '@/components/Login'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { firebaseConfig } from '@/firebaseconfig'
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  setDoc,
  query,
  where,
} from 'firebase/firestore/lite'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const db = getFirestore()

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userRef = doc(db, 'sisusers', user.uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          console.log('Fetched user data')
          setData(userData)
        }
      }
    }

    fetchData()
  }, [user])

  console.log(data)

  return (
    <div className="container mx-auto justify-center text-center">
      <h1 className="mt-8 text-center text-3xl font-bold">
        Welcome to MiniSIS
      </h1>
      {user ? (
        <div>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setUser(null)}>Sign out</button>
        </div>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  )
}

export default HomePage
