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
      aria-hidden="true"
      role="status"
      class="me-3 inline h-5 w-5 animate-spin text-white"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
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
      className="size-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
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
    result += `Name: ${jsonData.name.toLowerCase()}\n`
    result += `CGPA: ${jsonData.cgpa}\n`
    result += 'Semester SGPAs:\n---\n'
    const { semesters } = jsonData.academicHistory
    let semCount = 1
    semesters.forEach((semesterData) => {
      const { semester, sgpa } = semesterData
      const semesterName = semester.trim()
      if (semesterName.toLowerCase().includes('supplementary')) {
        result += `  Supplementary Semester: SGPA = ${sgpa} in (${semesterName})\n`
      } else {
        result += `  Sem ${semCount}: SGPA = ${sgpa} during (${semesterName})\n --- \n`
        semCount += 1
      }
    })

    result += '\nCourse Details:\n'
    jsonData.courses.forEach((course) => {
      result += `  ${course.CourseName}\n`
      result += `    Internal Score: ${course.InternalScore}/50, Attendance: ${course.attendance}%\n`
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
    // console.log('Student Data:', stringData)
    const prompt = `Roast this student in a witty and humorous manner based on the following details:

    My Details:
    ---
    ${stringData}
    ---
    Give a roast that is playful and extreamly sarcastic. Focus on Cources and SGPAs which has extream scores like lows and highs.`

    const endpoint = 'https://api.groq.com/openai/v1/chat/completions'
    const body = JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content:
            'You are a roast master. You are a witty and humorous AI that generates very creative roasts. You are a comedic AI specializing in roasts.',
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
      //   console.log('Roast:', aiRoasts)

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
    <div className="flex flex-col items-center justify-center">
      {aiRoasts.length > 0 && (
        <div className="mt-4 flex justify-start">
          <div className="lg:text-md rounded-md bg-slate-100 p-2 text-sm text-gray-700 dark:bg-slate-700 dark:text-indigo-100">
            <AIResponse text={aiRoasts[aiRoasts.length - 1].message} />
          </div>
        </div>
      )}
      <button
        onClick={handleRoast}
        className="mt-4 flex items-center justify-center rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingBtn className="mr-2 h-5 w-5" />
        ) : (
          <SendBtn className="mr-2 h-5 w-5" />
        )}{' '}
        Generate Roast by AI
      </button>
      {error && <p className="mt-2 text-red-400">{error}</p>}
    </div>
  )
}

export default RoastAI
