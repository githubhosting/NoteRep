import React from 'react'
import { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { firebaseConfig } from '@/firebaseconfig'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // if already initialized, use that one
}

export function Bot() {
  const [isLoading, setIsLoading] = useState(false)
  const [userQuery, setUserQuery] = useState('')
  const [apiResponse, setApiResponse] = useState('')
  const [completeresponse, setCompleteResponse] = useState('')

  const handleInputChange = (event) => {
    setUserQuery(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && userQuery.trim()) {
      makeApiCall()
    }
  }

  const saveChatHistory = async (userQuery, apiResponse) => {
    const db = firebase.firestore()
    const timestamp = firebase.firestore.Timestamp.now()
    try {
      await db.collection('chathistory').add({
        query: userQuery,
        response: apiResponse,
        timestamp: timestamp,
      })
    } catch (error) {
      console.error('Firebase error:', error)
    }
  }

  const makeApiCall = async () => {
    if (!userQuery.trim()) return
    setIsLoading(true)
    const endpoint = 'https://api.groq.com/openai/v1/chat/completions'
    const body = JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful AI bot. Your are installed inside a website called NoteRep. You are created by Shravan',
        },
        { role: 'user', content: userQuery },
      ],
      temperature: 0.7,
    })
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API}`,
    }

    try {
      const response = await fetch(endpoint, { method: 'POST', headers, body })
      const data = await response.json()
      const message = data.choices[0].message.content
      setApiResponse(message)
      saveChatHistory(userQuery, message)
    } catch (error) {
      console.error('Error:', error)
      setApiResponse('Error fetching response')
      saveChatHistory(userQuery, 'Error fetching response');
    } finally {
      setIsLoading(false)
      setUserQuery('')
    }
  }

  return (
    <>
      <section className="relative bg-indigo-50 pb-10 dark:bg-gray-900 sm:py-10">
        <div className="container mx-auto max-w-lg rounded bg-white p-5 shadow-lg dark:bg-gray-800">
          <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Noterep Chat Bot
          </h1>
          <p className="mt-1 text-center text-xs italic text-gray-600 dark:text-gray-400">
            An AI Bot that responds faster than the speed of light
          </p>
          {apiResponse && (
            <div className="mt-4 rounded bg-gray-100 p-4 text-center text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300 lg:text-lg">
              <p>{apiResponse}</p>
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="mt-4 w-full rounded-md border bg-slate-700 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            <div className="mt-4 flex justify-center">
              <button
                onClick={makeApiCall}
                className="rounded-md bg-blue-500 px-2 py-1 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading || !userQuery.trim()}
              >
                {isLoading ? (
                  <svg
                    className="-ml-1 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
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
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
