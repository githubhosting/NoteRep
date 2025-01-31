import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Header } from '@/components/Header'
import Login from '@/components/Login'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { firebaseConfig } from '@/firebaseconfig'
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  increment,
} from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingNew from '@/components/LoadingNew'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const db = getFirestore()

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [data, setData] = useState([])
  const [studentData, setStudentData] = useState(null)
  const [loginCounter, setLoginCounter] = useState(0)

  const [usn, setUsn] = useState('')
  const [dob, setDob] = useState('')

  useEffect(() => {
    const storedUsn = localStorage.getItem('usn')
    const storedDob = localStorage.getItem('dob')

    if (storedUsn && storedDob) {
      setUsn(storedUsn)
      setDob(storedDob)
      setIsLoggedIn(true)
      handleFetchData(storedUsn, storedDob)
    }
  }, [])

  const updateAnalytics = async (usn, dob) => {
    try {
      const userRef = doc(db, 'studentAnalytics', usn)
      const userDoc = await getDoc(userRef)
      const timestamp = serverTimestamp()

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          lastLogin: timestamp,
          loginCount: increment(1),
        })
      } else {
        await setDoc(userRef, {
          usn,
          dob,
          firstLogin: timestamp,
          lastLogin: timestamp,
          loginCount: 1,
        })
      }
    } catch (err) {
      console.error('Error updating analytics:', err)
    }
  }

  const handleFetchData = async (currentUsn, currentDob) => {
    if (!currentUsn || !currentDob) {
      setError('Please enter both USN and DOB')
      return
    }

    try {
      setError('')
      setIsLoading(true)
      const testurl = 'http://127.0.0.1:5000/test'
      const apiurl = `http://127.0.0.1:5000/sis?endpoint=newparents&usn=${currentUsn}&dob=${currentDob}`

      const response = await fetch(testurl)
      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error || 'Failed to fetch data.')
      }

      const data = await response.json()

      const dummydata = {
        courses: [
          {
            CourseCode: 'CI71',
            CourseName: 'Multicore Architecture and programming',
            InternalScore: 41,
            attendance: 87,
            credit: 4,
          },
          {
            CourseCode: 'CI72',
            CourseName: 'Foundations of Computer Vision',
            InternalScore: 37,
            attendance: 86,
            credit: 3,
          },
          {
            CourseCode: 'CIL74',
            CourseName: 'Containerization Laboratory',
            InternalScore: 40,
            attendance: 90,
            credit: 1,
          },
          {
            CourseCode: 'CIL75',
            CourseName: 'Skill Enhancement Lab -Generative AI',
            InternalScore: 46,
            attendance: 86,
            credit: 3,
          },
          {
            CourseCode: 'CIE731',
            CourseName: 'Information Retrieval',
            InternalScore: 31,
            attendance: 76,
            credit: 3,
          },
          {
            CourseCode: 'MEOE07',
            CourseName: 'Product Design and Manufacturing',
            InternalScore: 37,
            attendance: 88,
            credit: 3,
          },
        ],
        lastUpdated: '01/02/2025',
        name: 'NISHA S',
        usn: '1MS21CI035',
      }

      await updateAnalytics(currentUsn, currentDob)
      console.log('updated analytics')
      localStorage.setItem('usn', currentUsn)
      localStorage.setItem('dob', currentDob)

      setIsLoggedIn(true)
      setLoginCounter((prev) => prev + 1)
      setStudentData(data)
    } catch (err) {
      setError(err.message || 'Unknown error occurred')
      setIsLoggedIn(false)
    } finally {
      setIsLoading(false)
      toast.success('Data fetched successfully!')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('usn')
    localStorage.removeItem('dob')
    setUsn('')
    setDob('')
    setLoginCounter(0)
    setStudentData(null)
    setError('')
    setIsLoggedIn(false)
  }

  return (
    <>
      <Head>
        <title>Student Portal - Mini SIS NoteRep</title>
        <meta
          name="description"
          content="Mini SIS Student Portal - A simple student information system for Ramaiah Institute of Technology."
        />
        <meta name="theme-color" content="black-translucent" />
        <meta
          name="google-site-verification"
          content="gYJr3zyNUad36lu_-fZx1x5r272Wt_RBB26MWCSYxPA"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="noterep, notes, notes sharing, notes msrit, noterep.vercel.app, sis, parentportal, studentportal, ramaiah portal"
        />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <div className="flex h-screen flex-col">
        <Header />
        <ToastContainer />
        <main className="flex flex-col items-center bg-indigo-50 p-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <div className="mx-2 mb-2 max-w-3xl rounded-lg bg-indigo-50 px-4 py-2 shadow dark:bg-slate-800 sm:px-6 lg:mx-auto lg:w-full lg:px-8">
            <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              Mini Student Portal
            </h1>
            <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-200">
              One Time Login to access your student details. Grade.
              <span className="text-xs italic text-gray-500 dark:text-gray-100">
                {' '}
                Estimate your Grades based on Internal Marks.
              </span>
            </p>
          </div>
          {!isLoggedIn ? (
            <section className="relative bg-indigo-50 px-2 pb-8 dark:bg-gray-900 sm:pb-2 sm:pt-2">
              <div className="flex w-full max-w-md flex-col gap-4">
                <label className="flex flex-col">
                  <span className="mb-2 text-sm">USN</span>
                  <input
                    type="text"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
                    placeholder="e.g., 1MS22CS020"
                    className="rounded border bg-slate-50 px-3 py-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-500"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="mb-2 text-sm">
                    Date of Birth (YYYY-MM-DD)
                  </span>
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="2000-05-31"
                    className="rounded border bg-slate-50 px-3 py-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-500"
                  />
                </label>

                <button
                  onClick={() => handleFetchData(usn, dob)}
                  className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                >
                  Login
                </button>

                {error && (
                  <p className="rounded bg-gray-800 p-2 text-sm text-red-400">
                    {error}
                  </p>
                )}
              </div>
            </section>
          ) : (
            <section className="relative bg-indigo-50 px-2 pb-8 dark:bg-gray-900 sm:pb-2 sm:pt-2">
              <div className="w-full max-w-6xl">
                {studentData && (
                  <div className="rounded-md p-4 shadow-md dark:bg-gray-800">
                    <p className="mb-2">
                      <span className="font-semibold">Name: </span>
                      {studentData['name']}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">ID: </span>
                      {studentData['usn']}
                    </p>
                    <p className="mb-4">
                      <span className="font-semibold">Last Updated: </span>
                      {studentData['lastUpdated'] || 'N/A'}
                    </p>

                    <div className="overflow-x-auto">
                      <table className="min-w-full rounded-md bg-gray-700 text-sm">
                        <thead className="border-b text-left">
                          <tr className="rounded-t-md">
                            <th className="px-3 py-2">Course Code</th>
                            <th className="px-3 py-2">Course Name</th>
                            <th className="px-3 py-2">CIE Score</th>
                            {/* <th className="px-3 py-2">Attendance (%)</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {studentData.courses.map((course, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-600 last:border-0"
                            >
                              <td className="px-3 py-2">
                                {course['CourseCode']}
                              </td>
                              <td className="px-3 py-2">
                                {course['CourseName']}
                              </td>
                              <td className="px-3 py-2">
                                {course['InternalScore']}
                              </td>
                              {/* <td className="px-3 py-2">
                              {course['attendance']}
                            </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleLogout}
                    className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </section>
          )}
          {isLoading && <LoadingNew />}
        </main>
      </div>
    </>
  )
}

export default HomePage
