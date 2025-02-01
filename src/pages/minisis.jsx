import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { firebaseConfig } from '@/firebaseconfig'
import {
  getFirestore,
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

// Initialize Firebase if not already initialized.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const db = getFirestore()

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [studentData, setStudentData] = useState(null)
  const [loginCounter, setLoginCounter] = useState(0)
  const [usn, setUsn] = useState('')
  const [dob, setDob] = useState('')

  // On mount, read stored credentials and student data from localStorage.
  useEffect(() => {
    const storedUsn = localStorage.getItem('usn')
    const storedDob = localStorage.getItem('dob')
    const storedStudentData = localStorage.getItem('studentData')
    if (storedUsn && storedDob) {
      setUsn(storedUsn)
      setDob(storedDob)
      if (storedStudentData) {
        try {
          setStudentData(JSON.parse(storedStudentData))
        } catch (e) {
          console.error('Error parsing student data from localStorage', e)
        }
      }
      setIsLoggedIn(true)
    }
  }, [])

  // Update analytics using Firebase Firestore.
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

  // Fetch student data from the API.
  const handleFetchData = async (currentUsn, currentDob) => {
    if (!currentUsn || !currentDob) {
      setError('Please enter both USN and DOB')
      toast.error('Please enter both USN and DOB')
      return
    }

    const usnRegex = /^1[A-Z]{2}\d{2}[A-Z]{2}\d{3}$/
    if (!usnRegex.test(currentUsn)) {
      setError('Invalid USN format. Expected format: 1MS00XX000')
      toast.error('Invalid USN format. Expected format: 1MS00XX000')
      return
    }

    try {
      setError('')
      setIsLoading(true)
      const testurl = 'http://127.0.0.1:5000/test'
      const apiurl = `https://reconnect-msrit.vercel.app/sis?endpoint=newparents&usn=${currentUsn}&dob=${currentDob}`
      const response = await fetch(apiurl)
      if (!response.ok) {
        const resp = await response.json()
        throw new Error(resp.error || 'Failed to fetch data.')
      }

      const data = await response.json()
      await updateAnalytics(currentUsn, currentDob)
      localStorage.setItem('usn', currentUsn)
      localStorage.setItem('dob', currentDob)
      localStorage.setItem('studentData', JSON.stringify(data))
      setStudentData(data)
      setIsLoggedIn(true)
      setLoginCounter((prev) => prev + 1)
      toast.success('Data fetched successfully!')
    } catch (err) {
      setError(err.message || 'Unknown error occurred')
      setIsLoggedIn(false)
      toast.error(err.message || 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Logout: clear localStorage and state.
  const handleLogout = () => {
    localStorage.removeItem('usn')
    localStorage.removeItem('dob')
    localStorage.removeItem('studentData')
    setUsn('')
    setDob('')
    setLoginCounter(0)
    setStudentData(null)
    setError('')
    setIsLoggedIn(false)
    toast.info('Logged out successfully')
  }

  // Hard reload: re-fetch data using stored USN and DOB.
  const handleReload = () => {
    if (usn && dob) {
      toast.info('Reloading data...')
      handleFetchData(usn, dob)
    } else {
      toast.error('USN and DOB not available for reload')
    }
  }

  const getRequiredExamMarks = (internal, target) => {
    const required = (target - internal) * 2
    if (required < 0) return 0
    if (required > 100) return '-'
    return required
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
      <div className="flex h-screen flex-col bg-indigo-50 dark:bg-gray-900 dark:text-gray-100">
        <Header />
        <ToastContainer />
        <main className="flex flex-col items-center bg-indigo-50 p-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <div className="mx-2 mb-2 max-w-3xl rounded-lg bg-indigo-50 px-4 py-2 shadow dark:bg-slate-800 sm:px-6 lg:mx-auto lg:w-full lg:px-8">
            <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              Mini Student Portal
            </h1>
            <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-200">
              One Time Login to access Student Information from parent Portal.
              <span className="text-xs italic text-gray-500 dark:text-gray-100">
                {' '}
                Estimate your Grades based on Internal Marks.
              </span>
            </p>
          </div>
          {!isLoggedIn ? (
            <section className="relative rounded-md border bg-indigo-50 px-4 py-6 shadow-md dark:border-gray-500 dark:bg-gray-900 sm:mt-6 sm:pb-2 sm:pt-2">
              <div className="flex w-full max-w-md flex-col gap-4">
                <label className="flex flex-col">
                  <span className="mb-2 text-sm">USN</span>
                  <input
                    type="text"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value.toUpperCase())}
                    placeholder="e.g., 1MS22CS020"
                    className="rounded-md border bg-slate-50 px-3 py-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-500"
                  />
                </label>
                <label className="flex flex-col">
                  <span className="mb-2 text-sm">Date of Birth</span>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="rounded-md border bg-slate-50 px-3 py-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-500"
                  />
                </label>
                <button
                  onClick={() => handleFetchData(usn, dob)}
                  className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Login'}
                </button>

                {error && (
                  <p className="rounded bg-gray-800 p-2 text-sm text-red-400">
                    {error}
                  </p>
                )}
              </div>
            </section>
          ) : (
            <section className="relative bg-indigo-50 px-2 pb-8 dark:bg-gray-900 sm:max-w-4xl sm:pb-2 sm:pt-2">
              <div className="w-full max-w-6xl">
                {studentData && (
                  <div className="rounded-md p-4 shadow-md dark:bg-gray-800">
                    <p className="mb-2">
                      <span className="font-semibold">Name: </span>
                      {studentData.name}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">ID: </span>
                      {studentData.usn}
                    </p>
                    <p className="mb-4">
                      <span className="font-semibold">Last Updated: </span>
                      {studentData.lastUpdated || 'N/A'}
                    </p>

                    <div className="overflow-x-auto">
                      <table className="min-w-full rounded-md text-sm dark:bg-gray-700">
                        <thead className="border-b text-left">
                          <tr className="rounded-t-md">
                            <th className="px-3 py-2">Course Code</th>
                            <th className="px-3 py-2">Course Name</th>
                            <th className="px-3 py-2">Internals</th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {studentData.courses.map((course, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-600 last:border-0"
                            >
                              <td className="px-3 py-2">{course.CourseCode}</td>
                              <td className="px-3 py-2">{course.CourseName}</td>
                              <td className="px-3 py-2 text-center">
                                {course.InternalScore}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* <div className="mt-8 overflow-x-auto">
                      <h2 className="mb-4 text-center text-xl font-bold">
                        Required SEE Marks for Target Grades
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="min-w-max rounded-md bg-gray-700 text-sm">
                          <thead className="border-b text-left">
                            <tr className="rounded-t-md">
                              <th className="px-2 py-2">Course Name</th>
                              <th className="px-2 py-2">O (≥90)</th>
                              <th className="px-2 py-2">A+ (≥80)</th>
                              <th className="px-2 py-2">A (≥70)</th>
                              <th className="px-2 py-2">B+ (≥60)</th>
                              <th className="px-2 py-2">B (≥50)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentData.courses.map((course, index) => {
                              const internal = course.InternalScore
                              const requiredO = getRequiredExamMarks(
                                internal,
                                90
                              )
                              const requiredAPlus = getRequiredExamMarks(
                                internal,
                                80
                              )
                              const requiredA = getRequiredExamMarks(
                                internal,
                                70
                              )
                              const requiredBPlus = getRequiredExamMarks(
                                internal,
                                60
                              )
                              const requiredB = getRequiredExamMarks(
                                internal,
                                50
                              )
                              return (
                                <tr
                                  key={index}
                                  className="border-b border-gray-600 last:border-0"
                                >
                                  <td className="max-w-[150px] truncate px-2 py-2">
                                    {course.CourseName}
                                  </td>
                                  <td className="px-2 py-2 text-center">
                                    {requiredO}
                                  </td>
                                  <td className="px-2 py-2 text-center sm:table-cell">
                                    {requiredAPlus}
                                  </td>
                                  <td className="px-2 py-2 text-center sm:table-cell">
                                    {requiredA}
                                  </td>
                                  <td className="px-2 py-2 text-center md:table-cell">
                                    {requiredBPlus}
                                  </td>
                                  <td className="px-2 py-2 text-center md:table-cell">
                                    {requiredB}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div> */}
                  </div>
                )}
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={handleReload}
                    className="rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Reloading...' : 'Reload Data'}
                  </button>
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
        <Footer />
      </div>
    </>
  )
}

export default HomePage
