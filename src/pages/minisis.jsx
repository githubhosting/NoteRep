import React, { useState, useEffect, useRef } from 'react'
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
  arrayUnion,
} from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingNew from '@/components/LoadingNew'
import RoastAI from '@/components/RoastBot'
import ComplimentAI from '@/components/ComplimentBot'
import { getOrCreateUserId } from '@/utils/user'
import { BadgeCheck, Target, TrendingUp } from 'lucide-react'

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

const NewMobileCourseCard = ({ course }) => {
  const gradeThresholds = [
    { label: 'O', min: 90, max: 100 },
    { label: 'A+', min: 80, max: 89 },
    { label: 'A', min: 70, max: 79 },
    { label: 'B+', min: 60, max: 69 },
    { label: 'B', min: 55, max: 59 },
    { label: 'C', min: 50, max: 54 },
    { label: 'P', min: 40, max: 49 },
  ]

  const calculateRange = (minTarget, maxTarget) => {
    const minSEE = Math.max(35, (minTarget - course.InternalScore) * 2)
    const maxSEE = Math.max(35, (maxTarget - course.InternalScore) * 2) + 1

    if (minSEE > 100) return null // Not achievable if more than 100 marks are required
    const minDisplay = minSEE <= 0 ? 35 : minSEE
    const maxDisplay = maxSEE > 100 ? 100 : maxSEE

    return minDisplay === maxDisplay
      ? `${minDisplay}`
      : `${maxDisplay} - ${minDisplay}`
  }

  const visibleThresholds = gradeThresholds
    .map((th) => {
      const range = calculateRange(th.min, th.max)
      return range == '36 - 35' || range === null ? null : { ...th, range }
    })
    .filter((th) => th !== null)

  return (
    <div className="my-4 rounded-md border bg-white p-4 shadow dark:bg-gray-800">
      <h3 className="mb-1 text-lg font-bold">{course.CourseName}</h3>
      <p className="mb-3 text-sm md:text-base">
        Internal Score: {course.InternalScore} / 50
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {visibleThresholds.map((th) => (
          <div
            key={th.label}
            className="flex flex-[1_1_calc(33.33%-0.5rem)] flex-col items-center justify-center rounded border p-2 text-center sm:flex-[1_1_calc(16.66%-0.5rem)]"
          >
            <div className="text-sm font-bold sm:text-base">{th.label}</div>
            <div className="text-xs sm:text-sm">{th.range}</div>
          </div>
        ))}
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
    if (required <= 0) return null
    const finalRequired = Math.max(35, required)
    return finalRequired > 100 ? null : finalRequired
  }

  const getVisibleGrades = (course) => {
    const internal = course.InternalScore
    return gradeThresholds
      .map((th) => {
        const required = getRequiredExamMarks(internal, th.target)
        return required === 35 || required === null ? null : { ...th, required }
      })
      .filter((th) => th !== null)
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
      <div className="mb-6 flex justify-center overflow-x-auto">
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
                          value === null
                            ? 'bg-red-50 dark:bg-red-900/20'
                            : value === 35
                            ? 'bg-blue-50 dark:bg-blue-900/20'
                            : ''
                        }`}
                      >
                        {value !== null ? `${value}+` : ''}
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

const SGPAPrediction = ({ studentData, onReload }) => {
  if (!studentData?.predictions) {
    return (
      <div className="w-full border-t px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">
            Predicted SGPA
          </h2>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <p className="text-center text-gray-500 dark:text-gray-400">
              Predicted SGPA data not available. Please reload the data to view
              predictions.
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={onReload}
                className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Reload Data
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // function to add the sgpa to cgpa
  function addSGPAtoCGPA(sgpa, cgpa) {
    return (sgpa + 6 * cgpa) / 7
  }

  const predictions = [
    {
      title: 'Minimum Expected',
      value: studentData?.predictions?.atleast?.predicted_sgpa || 'N/A',
      description: 'Your baseline grade with current effort',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: BadgeCheck,
    },
    {
      title: 'Most Likely',
      value: studentData?.predictions?.mostlikely?.predicted_sgpa || 'N/A',
      description: 'Expected grade based on current performance',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: TrendingUp,
    },
    {
      title: 'Maximum Potential',
      value: studentData?.predictions?.maxeffort?.predicted_sgpa || 'N/A',
      description: 'Achievable with maximum effort',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: Target,
    },
  ]

  return (
    <div className="w-full border-t px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Predicted SGPA
        </h2>
        {/* the how part redirect to `/howitworks` */}
        <div className="mb-6 text-center">
          <a
            href="/howitworks"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Click here to know How this works?
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {predictions.map((prediction) => (
            <div
              key={prediction.title}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-full p-2 ${prediction.color} dark:bg-opacity-10`}
                >
                  <prediction.icon className={`h-6 w-6 ${prediction.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {prediction.title}
                  </h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  {prediction.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  CGPA:{' '}
                  {addSGPAtoCGPA(prediction.value, studentData.cgpa).toFixed(2)}
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {prediction.description}
                </p>
              </div>
            </div>
          ))}
        </div>
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

  // Theme detection and setting.
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.theme = 'light'
    localStorage.theme = 'dark'
    localStorage.removeItem('theme')
  }, [])

  // Load user data from localStorage.
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
      const studentdata = JSON.parse(localStorage.getItem('studentData'))
      const name = studentdata.name
      const cgpa = studentdata.cgpa
      const predicted = studentdata.predictions
      // make an array of the predicted gpa with key and value
      const predictedGPA = [
        { key: 'atleast', value: predicted.atleast.predicted_sgpa },
        { key: 'mostlikely', value: predicted.mostlikely.predicted_sgpa },
        { key: 'maxeffort', value: predicted.maxeffort.predicted_sgpa },
      ]
      const timestamp = serverTimestamp()

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          usn,
          dob,
          name,
          cgpa,
          predicted: predictedGPA,
          lastLogin: timestamp,
          loginCount: increment(1),
        })
      } else {
        await setDoc(userRef, {
          usn,
          dob,
          name,
          cgpa,
          predicted: predictedGPA,
          firstLogin: timestamp,
          lastLogin: timestamp,
          loginCount: 1,
        })
      }
      console.log('Analytics updated successfully!')
    } catch (err) {
      console.error('Error updating analytics:', err)
    }
  }

  const updateChatHistoryLoginFound = async (usn, name) => {
    try {
      const deviceId = getOrCreateUserId()
      const chatHistoryDocRef = doc(db, 'chathistory', deviceId)
      await setDoc(
        chatHistoryDocRef,
        { loginFound: arrayUnion({ usn, name }) },
        { merge: true }
      )
      console.log('Updated loginFound in chatHistory for device', deviceId)
    } catch (err) {
      console.error('Error updating loginFound in chatHistory:', err)
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
          loginCount: increment(1),
          loginEvents: arrayUnion({ usn, timestamp }),
        })
      } else {
        await setDoc(deviceDocRef, {
          loginCount: 1,
          loginEvents: [{ usn, timestamp }],
        })
      }
      console.log(`Device analytics updated for device ${deviceId}`)
    } catch (err) {
      console.error('Error updating device analytics:', err)
    }
  }

  // Fetch student data from the API.
  const handleFetchData = async (currentUsn, currentDob) => {
    console.log('Logging in with USN:', currentUsn)
    if (!currentUsn || !currentDob) {
      setError('Please enter both USN and DOB')
      toast.error('Please enter both USN and DOB')
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
      const testurl = `http://127.0.0.1:5000/sis?endpoint=newparents&usn=${currentUsn}&dob=${currentDob}`
      let apiurl = `https://reconnect-msrit.vercel.app/sis?endpoint=parentsodd&usn=${currentUsn}&dob=${currentDob}`
      if (currentUsn === '1MS21AB001' && currentDob === '2003-01-01') {
        toast.info('Logging in with test data...')
        apiurl = 'https://reconnect-msrit.vercel.app/test'
      }
      const response = await fetch(apiurl)
      if (!response.ok) {
        const resp = await response.json()
        throw new Error(resp.error || 'Failed to fetch data.')
      }
      const data = await response.json()
      localStorage.setItem('usn', currentUsn)
      localStorage.setItem('dob', currentDob)
      localStorage.setItem('studentData', JSON.stringify(data))
      setStudentData(data)
      await updateAnalytics(currentUsn, currentDob)
      await updateDeviceAnalytics(currentUsn)
      await updateChatHistoryLoginFound(currentUsn, data.name)
      setIsLoggedIn(true)
      setLoginCounter((prev) => prev + 1)
      toast.success(`Welcome, ${data.name}!`)
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

  const aiResponseRef = useRef(null)
  const predictionRef = useRef(null)

  const handleScrollToResponse = () => {
    if (aiResponseRef.current) {
      aiResponseRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToPrediction = () => {
    if (predictionRef.current) {
      predictionRef.current.scrollIntoView({ behavior: 'smooth' })
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
            {/* if student data the show a button to scroll to generate ai roast */}
            <div className="flex items-center justify-center ">
              {studentData && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleScrollToResponse}
                    className="group relative mt-2 inline-block cursor-pointer rounded-full p-px text-xs font-semibold leading-6 text-white no-underline shadow-2xl  shadow-zinc-900 dark:bg-slate-800"
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </span>
                    <div className="relative z-10 flex items-center space-x-2 rounded-full bg-slate-900 px-4 py-0.5 ring-1 ring-white/10 ">
                      <span>Scroll to AI Roast</span>
                      <svg
                        fill="none"
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.75 8.75L14.25 12L10.75 15.25"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                  </button>

                  <button
                    onClick={handleScrollToPrediction}
                    className="inline-flex h-[1.8rem] animate-shimmer items-center justify-center rounded-full border border-slate-700 bg-[linear-gradient(110deg,#fefcea,45%,#f1f1f1,55%,#fefcea)] bg-[length:200%_100%] px-6 text-xs font-medium text-slate-900 shadow-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] dark:text-white"
                  >
                    Predicted SGPA
                  </button>
                </div>
              )}
            </div>
          </div>
          {!isLoggedIn ? (
            <section className="relative rounded-md border bg-indigo-50 px-4 py-6 shadow-md dark:border-gray-500 dark:bg-gray-900 sm:mt-6 sm:pb-2 sm:pt-2">
              <div className="flex w-full max-w-md flex-col gap-4">
                <label className="flex flex-col">
                  <span className="mb-2 text-sm">USN</span>
                  <input
                    type="text"
                    value={usn}
                    onChange={(e) =>
                      setUsn(e.target.value.toUpperCase().trim())
                    }
                    placeholder="1MS22CS020"
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
                {/* test login */}
                <button
                  onClick={() => handleFetchData('1MS21AB001', '2003-01-01')}
                  className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  disabled={isLoading}
                >
                  Test Login
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
                          <NewMobileCourseCard key={index} course={course} />
                        ))}
                      </div>
                      <GradesTable studentData={studentData} />
                    </div>

                    <div className="border-t">
                      <div ref={aiResponseRef} />
                      <h1 className="mt-4 text-center text-lg font-bold">
                        Roast by AI 🤖
                      </h1>
                      <RoastAI
                        studentData={studentData}
                        onRoastGenerated={handleScrollToResponse}
                      />
                    </div>

                    <div ref={predictionRef} className="mt-4">
                      <SGPAPrediction
                        studentData={studentData}
                        onReload={handleReload}
                      />
                    </div>

                    <div className="border-t">
                      <h1 className="mt-4 text-center text-lg font-bold">
                        Compliment by AI 🤖
                      </h1>
                      <ComplimentAI studentData={studentData} />
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
