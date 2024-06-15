import React from 'react'
import { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { firebaseConfig } from '@/firebaseconfig'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import showdown from 'showdown'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

function AIResponse({ text, response }) {
  const responsetime = response.usage.total_time.toFixed(2)
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
    '<h1 class="text-xl md:text-3xl font-bold mt-10">'
  )
  htmlContent = htmlContent.replace(
    /<h2>/g,
    '<h2 class="text-lg md:text-2xl font-bold mt-10">'
  )
  htmlContent = htmlContent.replace(
    /<h3>/g,
    '<h3 class="text-base md:text-xl font-bold mt-10">'
  )
  // Add classes to <p> tags
  htmlContent = htmlContent.replace(
    /<p>/g,
    '<p class="my-4 text-sm md:text-lg">'
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
  htmlContent = htmlContent.replace(/<li>/g, '<li class="text-sm md:text-lg">')
  htmlContent = htmlContent.replace(
    /<hr \/>/g,
    '<hr class="my-8 border-t border-gray-300"/>'
  )
  // Add classes to <pre> tags
  htmlContent = htmlContent.replace(
    /<pre>/g,
    '<pre class="p-4 bg-gray-100 rounded-lg overflow-x-auto font-mono text-sm leading-normal">'
  )
  htmlContent = htmlContent.replace(/<code>/g, '<code class="language-python">')

  // Identify the urls
  const urlRegex = /(\bhttps?:\/\/[^\s<]+[^\s`!()\[\]{};:'".,<>?«»“”‘’])/g
  htmlContent = htmlContent.replace(urlRegex, (url) => {
    const displayUrl = url
      .replace(/^https?:\/\/(www\.)?/, '')
      .replace(/\/$/, '')
    return `<a href="${url}" class="text-blue-500 underline">${displayUrl}</a>`
  })

  htmlContent = htmlContent.replace(/\.com/g, '')

  return (
    <div className="w-full">
      <div className="mx-auto rounded-lg text-left">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
          Response time: {responsetime} seconds
        </p>
      </div>
    </div>
  )
}

export function Bot() {
  const [isLoading, setIsLoading] = useState(false)
  const [userQuery, setUserQuery] = useState('')
  const [apiResponse, setApiResponse] = useState('')
  const [completeresponse, setCompleteResponse] = useState('')
  const [user, setUser] = useState(null)

  const generateUniqueId = () => {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    )
  }

  useEffect(() => {
    let userId = localStorage.getItem('userId')
    // let chatHistory = localStorage.getItem('chatHistory')
    console.log('User ID:', userId)
    if (!userId) {
      userId = generateUniqueId()
      localStorage.setItem('userId', userId)
    }
    setUser(userId)
  }, [])

  useEffect(() => {
    const requests = parseInt(localStorage.getItem('promptRequests') || '0', 10)
    console.log('Requests:', requests)
    if (requests >= 5) {
      toast.success(
        'You have made ' + requests + ' requests to the AI Bot. Keep going!',
        {
          position: 'top-center',
          autoClose: 2000,
        }
      )
    }
  }, [])

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
    const userDoc = db.collection('chathistory').doc(user)
    const timestamp = firebase.firestore.Timestamp.now()
    const chatEntry = {
      query: userQuery,
      response: apiResponse,
    }
    try {
      let localStorageChatHistory =
        JSON.parse(localStorage.getItem('chatHistory')) || []
      localStorageChatHistory.push(chatEntry)
      localStorage.setItem(
        'chatHistory',
        JSON.stringify(localStorageChatHistory)
      )
      await userDoc.set(
        {
          queries: firebase.firestore.FieldValue.arrayUnion({
            query: userQuery,
            response: apiResponse,
            timestamp: timestamp,
          }),
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Firebase error:', error)
    }
  }

  const makeApiCall = async () => {
    if (!userQuery.trim()) return
    setIsLoading(true)

    const requests = parseInt(localStorage.getItem('promptRequests') || '0', 10)
    localStorage.setItem('promptRequests', (requests + 1).toString())

    const endpoint = 'https://api.groq.com/openai/v1/chat/completions'
    const body = JSON.stringify({
      model: `${process.env.NEXT_PUBLIC_MODEL}`,
      messages: [
        {
          role: 'system',
          content:
            'You are the witty and helpful AI chatbot of NoteRep (An Open-Source StudyMaterial/Notes Sharing Platform).You are installed inside a website/platform URL: https://noterep.vercel.app - developed by Shravan. If and only when user ask for notes, humorously remind them to check the noterep website and not be lazy! Answer the user query properly and since they are already on the NoteRep website you dont have to redirect them everytime.',
        },
        { role: 'user', content: 'Who are you, and tell me about yourself' },
        {
          role: 'assistant',
          content:
            "Hey there! I'm NoteRep AI Chatbot, brought to life by the brilliant Shravan. He’s the genius behind NoteRep, the awesome website where I hang out. Thanks to his technical wizardry and creativity, I'm here to assist with your queries. Shravan's done a stellar job making NoteRep the go-to place for students. Working with him has been a blast, and I'm constantly getting better because of his support. So, big shoutout to Shravan for making all this possible!",
        },
        { role: 'user', content: `${process.env.NEXT_PUBLIC_U1}` },
        {
          role: 'assistant',
          content: `${process.env.NEXT_PUBLIC_A1}`,
        },
        // {
        //   role: 'user',
        //   content: `${process.env.NEXT_PUBLIC_U2}`,
        // },
        // {
        //   role: 'assistant',
        //   content: `${process.env.NEXT_PUBLIC_A2}`,
        // },
        { role: 'user', content: 'Hey! What is NoteRep?' },
        {
          role: 'assistant',
          content:
            'Welcome to NoteRep (https://noterep.vercel.app), developed by Shravan, An Open-Source Notes Sharing Platform. NoteRep centralizes all class notes, PPTs, and study materials to simplify and enhance your learning experience. Need help or looking for specific materials? Just ask or explore this NoteRep website!',
        },
        { role: 'user', content: userQuery },
      ],
      temperature: 0.7,
    })
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API}`,
    }
    // console.log('Body:', body)

    try {
      const response = await fetch(endpoint, { method: 'POST', headers, body })
      const data = await response.json()
      setCompleteResponse(data)
      const message = data.choices[0].message.content
      setApiResponse(message)
      toast.success(`Response time: ${data.usage.total_time.toFixed(2)}`, {
        position: 'top-center',
        autoClose: 2000,
      })
      saveChatHistory(userQuery, message)
    } catch (error) {
      console.error('Error:', error)
      setApiResponse('Error fetching response')
      saveChatHistory(userQuery, 'Error fetching response')
    } finally {
      setIsLoading(false)
      setUserQuery('')
    }
  }

  return (
    <>
      <ToastContainer />
      <section className="relative bg-indigo-50 px-2 pb-10 dark:bg-gray-900 sm:py-10">
        <div className="container mx-auto max-w-lg rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 sm:p-8 md:max-w-xl lg:max-w-3xl">
          <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            NoteRep AI Chat Bot
          </h1>
          <p className="mt-1 text-center text-xs italic text-gray-600 dark:text-gray-200">
            An AI Bot that responds faster than the speed of light.
          </p>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            It cant provide the notes. But you can have fun with it.
          </p>
          <p className="text-xs"> Session ID {user}</p>
          {apiResponse && (
            <div className="mt-2 rounded bg-gray-100 p-3 text-center text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300 lg:text-lg">
              <AIResponse text={apiResponse} response={completeresponse} />
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="mt-4 w-full rounded-md border border-gray-400 bg-slate-100 px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-200 dark:bg-slate-700 dark:text-white"
            />
            <div className="mt-4 flex justify-center">
              <button
                onClick={makeApiCall}
                className="rounded-md bg-blue-500 px-2 py-1 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
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
