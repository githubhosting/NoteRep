import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingNew from '@/components/LoadingNew'
import ExamRoastBot from '@/components/ExamRoastBot'
import { getOrCreateUserId } from '@/utils/user'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { firebaseConfig } from '@/firebaseconfig'
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
  serverTimestamp,
  increment,
} from 'firebase/firestore'

let db = null

// Initialize Firebase only on client side
if (typeof window !== 'undefined') {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app()
  }
  db = getFirestore()
}

function ExamPage() {
  const [usn, setUsn] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [resultData, setResultData] = useState(null)
  const aiResponseRef = useRef(null)

  // Load stored exam data on mount
  useEffect(() => {
    const storedData = localStorage.getItem('examData')
    if (storedData) {
      try {
        setResultData(JSON.parse(storedData))
      } catch (e) {
        console.error('Error parsing stored exam data:', e)
      }
    }
  }, [])

  const updateAnalytics = async (usn) => {
    try {
      const userRef = doc(db, 'studentAnalytics', usn)
      const userDoc = await getDoc(userRef)
      const name = resultData.name
      const timestamp = serverTimestamp()

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          name,
          lastExamCheck: timestamp,
          examCheckCount: increment(1),
        })
      } else {
        await setDoc(userRef, {
          usn,
          name,
          firstExamCheck: timestamp,
          lastExamCheck: timestamp,
          examCheckCount: 1,
        })
      }
    } catch (err) {
      console.error('Error updating analytics:', err)
    }
  }

  const updateDeviceAnalytics = async (usn) => {
    try {
      const deviceId = getOrCreateUserId()
      const deviceDocRef = doc(db, 'deviceAnalytics', deviceId)
      const deviceDocSnap = await getDoc(deviceDocRef)
      const timestamp = new Date().toISOString()

      if (deviceDocSnap.exists()) {
        await updateDoc(deviceDocRef, {
          examCheckCount: increment(1),
          examCheckEvents: arrayUnion({ usn, timestamp }),
        })
      } else {
        await setDoc(deviceDocRef, {
          examCheckCount: 1,
          examCheckEvents: [{ usn, timestamp }],
        })
      }
    } catch (err) {
      console.error('Error updating device analytics:', err)
    }
  }

  const handleFetchData = async (currentUsn) => {
    if (!currentUsn) {
      setError('Please enter your USN')
      toast.error('Please enter your USN')
      return
    }

    const usnRegex = /^1ms\d{2}[a-z]{2}\d{3}$/i
    if (!usnRegex.test(currentUsn)) {
      setError('Invalid USN format. Expected format: 1MS00XX000')
      toast.error('Invalid USN format. Expected format: 1MS00XX000')
      return
    }

    try {
      setError('')
      setIsLoading(true)
      const response = await fetch(`https://reconnect-msrit.vercel.app/exam?usn=${currentUsn}`)
      if (!response.ok) {
        throw new Error('Failed to fetch result data.')
      }
      const data = await response.json()
      data.usn = currentUsn // Add USN to the result data for tracking
      setResultData(data)
      localStorage.setItem('examData', JSON.stringify(data))
      await updateAnalytics(currentUsn)
      await updateDeviceAnalytics(currentUsn)
      toast.success('Result fetched successfully!')
    } catch (err) {
      setError(err.message || 'Unknown error occurred')
      toast.error(err.message || 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Exam Results - Student Portal | NoteRep</title>
        <meta
          name="description"
          content="View your exam results by entering your USN"
        />
        <meta name="theme-color" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex h-screen flex-col bg-indigo-50 dark:bg-gray-900 dark:text-gray-100">
        <Header />
        <ToastContainer />
        <main className="flex flex-col items-center bg-indigo-50 p-1 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <div className="mb-2 max-w-3xl rounded-lg bg-indigo-50 px-4 py-2 shadow dark:bg-slate-800 sm:px-6 lg:mx-auto lg:w-full lg:px-8">
            <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              Exam Results
            </h1>
            <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-200">
              Enter your USN to view your results
            </p>
          </div>

          <section className="relative rounded-md border bg-indigo-50 px-4 py-6 shadow-md dark:border-gray-500 dark:bg-gray-900 sm:mt-6 sm:pb-2 sm:pt-2">
            <div className="flex w-full max-w-md flex-col gap-4">
              <label className="flex flex-col">
                <span className="mb-2 text-sm">USN</span>
                <input
                  type="text"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleFetchData(usn)
                    }
                  }}
                  placeholder="1MS22CS020"
                  className="rounded-md border bg-slate-50 px-3 py-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-500"
                />
              </label>
              <button
                onClick={() => handleFetchData(usn)}
                className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'View Results'}
              </button>

              {error && (
                <p className="rounded bg-gray-800 p-2 text-sm text-red-400">
                  {error}
                </p>
              )}

              {resultData && (
                <>
                  <div className="mt-4 rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-semibold">Name:</span>
                        <span>{resultData.name}</span>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-semibold">Semester:</span>
                        <span>{resultData.semester}</span>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-semibold">SGPA:</span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {resultData.sgpa}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">CGPA:</span>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          {resultData.cgpa}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t">
                    <div ref={aiResponseRef} />
                    <h1 className="mt-4 text-center text-lg font-bold">
                      Roast by AI 🤖
                    </h1>
                    <ExamRoastBot examData={resultData} onRoastGenerated={() => {
                      if (aiResponseRef.current) {
                        aiResponseRef.current.scrollIntoView({ behavior: 'smooth' })
                      }
                    }} />
                  </div>
                </>
              )}
            </div>
          </section>
          {isLoading && <LoadingNew />}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ExamPage
