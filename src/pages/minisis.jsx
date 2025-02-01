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
import RoastAI from '@/components/RoastBot'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const db = getFirestore()

const MobileCourseCard = ({ course }) => {
  const gradeThresholds = [
    { label: 'O', target: 90 },
    { label: 'A+', target: 80 },
    { label: 'A', target: 70 },
    { label: 'B+', target: 60 },
    { label: 'B', target: 55 },
    { label: 'C', target: 50 },
    { label: 'P', target: 40 },
  ]

  const calculateRequired = (targetPercentage) => {
    const required = (targetPercentage - course.InternalScore) * 2
    if (required <= 0) return 'P'
    const finalRequired = Math.max(35, required)
    return finalRequired > 100 ? 'NA' : finalRequired
  }

  const visibleThresholds = gradeThresholds
    .filter((th) => {
      const required = (th.target - course.InternalScore) * 2
      return (
        required > 35 ||
        (required > 0 &&
          required <= 35 &&
          th ===
            gradeThresholds.find(
              (t) =>
                (t.target - course.InternalScore) * 2 > 0 &&
                (t.target - course.InternalScore) * 2 <= 35
            ))
      )
    })
    .filter((th) => calculateRequired(th.target) !== 'NA')
    .slice(0, 6)

  if (visibleThresholds.length === 0) {
    const highestAchieved = gradeThresholds.find(
      (th) => (th.target - course.InternalScore) * 2 <= 0
    )
    if (highestAchieved) {
      visibleThresholds.push(highestAchieved)
    }
  }

  return (
    <div className="my-4 rounded-md border bg-white p-4 shadow dark:bg-gray-800">
      <h3 className="mb-1 text-lg font-bold">{course.CourseName}</h3>
      <p className="mb-3 text-sm md:text-base">
        CIE Score: {course.InternalScore} / 50
      </p>

      <div
        className={`flex flex-wrap gap-1.5 sm:gap-2 ${
          visibleThresholds.length <= 3
            ? 'grid-cols-3'
            : 'grid-cols-3 sm:grid-cols-6'
        }`}
      >
        {visibleThresholds.map((th) => {
          const displayValue = calculateRequired(th.target)
          return (
            <div
              key={th.label}
              className={`flex min-w-[80px] flex-1 flex-col justify-center rounded border p-1.5 text-center sm:p-2 
              ${displayValue === 35 ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
              ${
                displayValue === '-' ? 'bg-green-50 dark:bg-green-900/20' : ''
              }`}
            >
              <div className="text-sm font-bold sm:text-base">{th.label}</div>
              <div className="text-xs sm:text-sm">{displayValue}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const GradesTable = ({ studentData }) => {
  const gradeThresholds = [
    { label: 'O', target: 90, header: 'O (≥90)' },
    { label: 'A+', target: 80, header: 'A+ (≥80)' },
    { label: 'A', target: 70, header: 'A (≥70)' },
    { label: 'B+', target: 60, header: 'B+ (≥60)' },
    { label: 'B', target: 55, header: 'B (≥55)' },
    { label: 'C', target: 50, header: 'C (≥50)' },
    { label: 'P', target: 40, header: 'P (≥40)' },
  ]

  const getRequiredExamMarks = (internal, target) => {
    const required = (target - internal) * 2
    if (required <= 0) return '-'
    const finalRequired = Math.max(35, required)
    return finalRequired > 100 ? 'NA' : finalRequired
  }

  const getVisibleGrades = (course) => {
    const internal = course.InternalScore

    return gradeThresholds.filter((th) => {
      const required = (th.target - internal) * 2
      return (
        required > 35 ||
        (required > 0 &&
          required <= 35 &&
          th ===
            gradeThresholds.find(
              (t) =>
                (t.target - internal) * 2 > 0 && (t.target - internal) * 2 <= 35
            ))
      )
    })
  }

  const maxVisibleGrades = Math.max(
    ...studentData.courses.map((course) => getVisibleGrades(course).length)
  )
  const showAllGrades = maxVisibleGrades === 0
  const visibleColumns = showAllGrades
    ? gradeThresholds.slice(0, 1)
    : gradeThresholds.slice(0, maxVisibleGrades)

  return (
    <div className="mt-8 hidden items-center md:block">
      <h2 className="mb-4 text-center text-xl font-bold">
        Required SEE Marks for Target Grades
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-max rounded-md text-sm dark:bg-gray-700">
          <thead className="border-b text-left">
            <tr className="rounded-t-md">
              <th className="px-2 py-2">Course Name</th>
              {visibleColumns.map((grade) => (
                <th key={grade.label} className="px-2 py-2">
                  {grade.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentData.courses.map((course, index) => {
              const visibleGrades = showAllGrades
                ? [gradeThresholds[0]]
                : getVisibleGrades(course)

              return (
                <tr
                  key={index}
                  className="border-b border-gray-600 last:border-0"
                >
                  <td className="truncate px-2 py-2">{course.CourseName}</td>
                  {visibleColumns.map((grade) => {
                    const value = getRequiredExamMarks(
                      course.InternalScore,
                      grade.target
                    )
                    return (
                      <td
                        key={grade.label}
                        className={`px-2 py-2 text-center ${
                          value === '-'
                            ? 'bg-green-50 dark:bg-green-900/20'
                            : value === 35
                            ? 'bg-blue-50 dark:bg-blue-900/20'
                            : ''
                        }`}
                      >
                        {value}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [studentData, setStudentData] = useState(null)
  const [loginCounter, setLoginCounter] = useState(0)
  const [usn, setUsn] = useState('')
  const [dob, setDob] = useState('')

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

  const updateAnalytics = async (usn, dob) => {
    try {
      const userRef = doc(db, 'studentAnalytics', usn)
      const userDoc = await getDoc(userRef)
      const name = studentData?.name || 'Unknown'
      const timestamp = serverTimestamp()

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          name,
          lastLogin: timestamp,
          loginCount: increment(1),
        })
      } else {
        await setDoc(userRef, {
          usn,
          dob,
          name,
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
      localStorage.setItem('usn', currentUsn)
      localStorage.setItem('dob', currentDob)
      localStorage.setItem('studentData', JSON.stringify(data))
      await updateAnalytics(currentUsn, currentDob)
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

  const handleReload = () => {
    if (usn && dob) {
      toast.info('Reloading data...')
      handleFetchData(usn, dob)
    } else {
      toast.error('USN and DOB not available for reload')
    }
  }

  return (
    <>
      <Head>
        <title>Grade Calculator - Mini Student Portal | NoteRep</title>
        <meta
          name="description"
          content="Calculate required SEE marks based on your CIE scores. Plan your SEE preparation with a grade calculator."
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
        <main className="flex flex-col items-center bg-indigo-50 p-1 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <div className="mb-2 max-w-3xl rounded-lg bg-indigo-50 px-4 py-2 shadow dark:bg-slate-800 sm:px-6 lg:mx-auto lg:w-full lg:px-8">
            <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              Mini Student Portal
            </h1>
            <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-200">
              One Time Login to access Student Information from parent Portal.
              <span className="text-xs italic text-gray-500 dark:text-gray-100">
                {' '}
                Calculate required SEE marks for your target grades.
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
            <section className="flex w-full items-center justify-center bg-indigo-50 pb-8 dark:bg-gray-900 sm:py-2">
              <div className="max-w-3xl lg:mx-auto lg:w-full">
                {studentData && (
                  <>
                    <div className="rounded-md shadow-md dark:bg-gray-800">
                      <div className="p-3">
                        <p className="mb-2">
                          <span className="font-semibold">Name: </span>
                          {studentData.name}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">USN: </span>
                          {studentData.usn}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">CGPA: </span>
                          {studentData.cgpa}
                        </p>
                        <p className="mb-4">
                          <span className="font-semibold">Last Updated: </span>
                          {studentData.lastUpdated || 'N/A'}
                        </p>
                      </div>

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
                                <td className="px-3 py-2">
                                  {course.CourseCode}
                                </td>
                                <td className="px-3 py-2">
                                  {course.CourseName}
                                </td>
                                <td className="px-3 py-2 text-center">
                                  {course.InternalScore}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="block md:hidden">
                        <h2 className="text-center text-lg font-bold">
                          Required SEE Marks (min) for Respective Grades
                        </h2>
                        {studentData.courses.map((course, index) => (
                          <MobileCourseCard key={index} course={course} />
                        ))}
                      </div>
                      <GradesTable studentData={studentData} />
                    </div>

                    <div>
                      <h1 className="mt-4 text-center text-lg font-bold">
                        Roast by AI 🤖
                      </h1>
                      <RoastAI studentData={studentData} />
                    </div>
                  </>
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
