import React, { use } from 'react'
import { useEffect, useState, useRef } from 'react'
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
} from 'firebase/firestore'
import showdown from 'showdown'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const db = getFirestore()

function LoadingBtn(props) {
  return (
    <svg
      className="h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        className="opacity-25"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C8.477 0 4 4.477 4 12z"
      ></path>
    </svg>
  )
}

function SendBtn(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      />
    </svg>
  )
}

function AIResponse({ text }) {
  const converter = new showdown.Converter()
  let htmlContent = converter.makeHtml(text)
  htmlContent = htmlContent.replace(
    /<(\w+)(\s+[^>]*)? id="[^"]*"([^>]*)>/g,
    '<$1$2$3>'
  )
  htmlContent = htmlContent.replace(
    /<(\w+)(\s+[^>]*)? id='[^']*'([^>]*)>/g,
    '<$1$2$3>'
  )
  htmlContent = htmlContent.replace(
    /<h1>/g,
    '<h1 class="text-sm md:text-md font-bold mt-10">'
  )
  htmlContent = htmlContent.replace(
    /<h2>/g,
    '<h2 class="text-sm md:text-md font-bold mt-10">'
  )
  htmlContent = htmlContent.replace(
    /<h3>/g,
    '<h3 class="text-sm md:text-md font-bold mt-10">'
  )
  htmlContent = htmlContent.replace(
    /<p>/g,
    '<p class="my-2 text-sm md:text-md">'
  )
  htmlContent = htmlContent.replace(
    /<strong>/g,
    '<strong class="font-bold mt-10">'
  )
  htmlContent = htmlContent.replace(
    /<ul>/g,
    '<ul class="list-disc pl-5 space-y-2 mb-4">'
  )
  htmlContent = htmlContent.replace(
    /<ol>/g,
    '<ol class="list-disc pl-5 space-y-2">'
  )
  htmlContent = htmlContent.replace(/<li>/g, '<li class="text-sm md:text-md">')
  htmlContent = htmlContent.replace(
    /<hr \/>/g,
    '<hr class="my-8 border-t border-gray-300"/>'
  )
  htmlContent = htmlContent.replace(
    /<pre>/g,
    '<pre class="p-4 bg-gray-100 rounded-lg overflow-x-auto font-mono text-sm leading-normal">'
  )
  htmlContent = htmlContent.replace(/<code>/g, '<code class="language-python">')
  const urlRegex = /(\bhttps?:\/\/[^\s<]+[^\s`!()\[\]{};:'".,<>?«»""''])/g
  htmlContent = htmlContent.replace(urlRegex, (url) => {
    let displayUrl = url.replace(/^https?:\/\/(www\.)?/, '')
    displayUrl = displayUrl.replace(/\/$/, '')
    return `<a href="${url}" target="_blank" class="text-blue-400 underline">${displayUrl}</a>`
  })

  return (
    <div className="text-left">
      <div className="" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}

const RoastAI = ({ studentData }) => {
  const [roast, setRoast] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [aiRoasts, setAiRoasts] = useState([])

  useEffect(() => {
    const storedRoasts = localStorage.getItem('aiRoasts')
    if (storedRoasts) {
      try {
        setAiRoasts(JSON.parse(storedRoasts))
      } catch (e) {
        console.error('Error parsing aiRoasts from localStorage', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('aiRoasts', JSON.stringify(aiRoasts))
  }, [aiRoasts])

  const updateAiRoastsInFirebase = async (usn, roastResponse) => {
    try {
      const userRef = doc(db, 'studentAnalytics', usn)
      const userDoc = await getDoc(userRef)
      const timestamp = firebase.firestore.Timestamp.now()
      const roastEntry = { response: roastResponse, timestamp }

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          airoasts: arrayUnion(roastEntry),
        })
      } else {
        await setDoc(userRef, {
          airoasts: [roastEntry],
        })
      }
    } catch (err) {
      console.error('Error updating AI roasts in Firebase:', err)
    }
  }

  function extractData(jsonData) {
    let result = ''
    result += `Name: ${jsonData.name}\n`
    result += `CGPA: ${jsonData.cgpa}\n`
    result += 'Semester SGPA:\n'
    jsonData.academicHistory.semesters.forEach((sem) => {
      result += `  ${sem.semester}: ${sem.sgpa}\n`
    })

    result += '\nCourse Details:\n'
    jsonData.courses.forEach((course) => {
      result += `  ${course.CourseName}\n`
      result += `    Internal Score: ${course.InternalScore}, Attendance: ${course.attendance}%\n`
    })

    return result
  }

  const handleRoast = async () => {
    if (!studentData) {
      setError('Student data is missing.')
      return
    }

    setIsLoading(true)
    setError('')
    setRoast('')
    const stringData = extractData(studentData)

    const prompt = `Roast this student in a witty and humorous manner based on the following details:
    My Details:
    ---
    ${stringData}
    ---
    Give a roast that is playful and sarcastic.`

    const endpoint = 'https://api.groq.com/openai/v1/chat/completions'
    const body = JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content:
            'You are a witty and humorous AI that generates very creative roasts.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.6,
    })
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API}`,
    }

    try {
      const response = await fetch(endpoint, { method: 'POST', headers, body })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate roast')
      }
      const data = await response.json()
      const message = data.choices[0].message.content
      setRoast(message)

      const timestamp = new Date().toISOString()
      const roastResponse = { message, timestamp }
      setAiRoasts((prev) => [...prev, roastResponse])
      console.log('Roast:', aiRoasts)

      const usnFromStudentData =
        studentData['usn'] || localStorage.getItem('usn')
      if (usnFromStudentData) {
        await updateAiRoastsInFirebase(usnFromStudentData, message)
      }
    } catch (err) {
      setError(err.message || 'Error generating roast')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      {aiRoasts.length > 0 && (
        <div className="mt-4 flex justify-start">
          <div className="lg:text-md rounded-md bg-slate-100 p-2 text-sm text-gray-700 dark:bg-slate-700 dark:text-indigo-100">
            <AIResponse text={aiRoasts[aiRoasts.length - 1].message} />
          </div>
        </div>
      )}
      <button
        onClick={handleRoast}
        className="flex items-center justify-center rounded bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingBtn className="mr-2 h-5 w-5" />
        ) : (
          <SendBtn className="mr-2 h-5 w-5" />
        )}
        Roast by AI
      </button>
      {error && <p className="mt-2 text-red-400">{error}</p>}
    </div>
  )
}

export default RoastAI
