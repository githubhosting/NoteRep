import React, { use } from 'react'
import { useEffect, useState, useRef } from 'react'
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

function ChatHistoryAIResponse({ text, responsetime }) {
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
  // Add classes to <p> tags
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
  // Add classes to <pre> tags
  htmlContent = htmlContent.replace(
    /<pre>/g,
    '<pre class="p-4 bg-gray-100 rounded-lg overflow-x-auto font-mono text-sm leading-normal">'
  )
  htmlContent = htmlContent.replace(/<code>/g, '<code class="language-python">')
  // Identify the urls
  const urlRegex = /(\bhttps?:\/\/[^\s<]+[^\s`!()\[\]{};:'".,<>?«»""''])/g
  htmlContent = htmlContent.replace(urlRegex, (url) => {
    let displayUrl = url.replace(/^https?:\/\/(www\.)?/, '')
    displayUrl = displayUrl.replace(/\/$/, '')
    return `<a href="${url}" target="_blank" class="text-blue-400 underline">${displayUrl}</a>`
  })

  return (
    <div className="text-left">
      {/* <p className="border-t border-slate-500 font-bold"></p> */}
      <div className="" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {responsetime && (
        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
          Response time: {responsetime} seconds
        </p>
      )}
    </div>
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

export function Bot({ moodstatus }) {
  const [isLoading, setIsLoading] = useState(false)
  const [userQuery, setUserQuery] = useState('')
  const [apiResponse, setApiResponse] = useState('')
  const [completeresponse, setCompleteResponse] = useState('')
  const [user, setUser] = useState(null)
  const [studentData, setStudentData] = useState({ name: 'Student' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [chathistory, setChatHistory] = useState([])
  const [prompts, setPrompts] = useState([])
  const [systemprompts, setSystemPrompts] = useState([])
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chathistory])

  const generateUniqueId = () => {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    )
  }

  useEffect(() => {
    let userId = localStorage.getItem('userId')
    let chatHistory = localStorage.getItem('chatHistory')
    let studentData = localStorage.getItem('studentData')
    if (studentData) {
      setStudentData(JSON.parse(studentData))
    }
    console.log('Chat History:', JSON.parse(chatHistory))
    if (chatHistory) {
      setChatHistory(JSON.parse(chatHistory))
    }
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

  const saveChatHistory = async (userQuery, apiResponse, responseTime) => {
    const db = firebase.firestore()
    const userDoc = db.collection('chathistory').doc(user)
    const timestamp = firebase.firestore.Timestamp.now()
    const responsetime = responseTime
    const chatEntry = {
      query: userQuery,
      response: apiResponse,
      responsetime: responsetime,
    }
    try {
      let localStorageChatHistory =
        JSON.parse(localStorage.getItem('chatHistory')) || []
      localStorageChatHistory.push(chatEntry)
      localStorage.setItem(
        'chatHistory',
        JSON.stringify(localStorageChatHistory)
      )
      const totalRequests = parseInt(
        localStorage.getItem('promptRequests') || '0',
        10
      )
      await userDoc.set(
        {
          queries: firebase.firestore.FieldValue.arrayUnion({
            query: userQuery,
            response: apiResponse,
            timestamp: timestamp,
          }),
          latestRequestTime: timestamp,
          totalRequests: totalRequests,
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Firebase error:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = firebase.firestore()
        const [promptResponse, systemPromptResponse] = await Promise.all([
          db.collection('prompt').get(),
          db.collection('systemprompt').get(),
        ])

        const promptsData = promptResponse.docs.map((doc) => doc.data())
        const systemPromptsData = systemPromptResponse.docs.map((doc) =>
          doc.data()
        )

        setPrompts(promptsData)
        setSystemPrompts(systemPromptsData)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const makeApiCall = async () => {
    if (!userQuery.trim()) return
    setIsLoading(true)

    const activePrompts = prompts.filter((prompt) => prompt.status)
    // console.log('Active Prompts:', activePrompts)

    // Get the last two entries from chat history
    const lastTwoEntries = chathistory.slice(-2).map((entry) => ({
      role: 'user',
      content: entry.query,
    }))

    // Append the assistant responses corresponding to those entries
    const pastResponses = chathistory.slice(-2).map((entry) => ({
      role: 'assistant',
      content: entry.response,
    }))

    let fullSystemPrompt = systemprompts
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .filter((prompt) => prompt.status === true)
      .map((prompt) => prompt.content)
      .join(' ')

    const moodprompt = 'You are a witty bot and your answers will be humorous. '
    if (moodstatus) {
      fullSystemPrompt =
        moodprompt + fullSystemPrompt + ' Note: Fun Mood Enabled.'
    }
    // console.log(fullSystemPrompt)

    const requests = parseInt(localStorage.getItem('promptRequests') || '0', 10)
    localStorage.setItem('promptRequests', (requests + 1).toString())

    const newChatEntry = {
      query: userQuery,
      response: '.....',
      responsetime: '0.15',
    }
    setChatHistory([...chathistory, newChatEntry])

    const endpoint = 'https://api.groq.com/openai/v1/chat/completions'
    const body = JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: fullSystemPrompt,
        },
        {
          role: 'user',
          content: 'Who are you? Can you tell me about yourself?',
        },
        {
          role: 'assistant',
          content:
            "Hey there! I'm NoteRep AI Chatbot, brought to life by the brilliant Shravan. He’s the genius behind NoteRep, the awesome website where I hang out. Thanks to his technical wizardry and creativity, I'm here to assist with your queries. Shravan's done a stellar job making NoteRep the go-to place for students. Working with him has been a blast, and I'm constantly getting better because of his support. So, big shoutout to Shravan for making all this possible!",
        },
        // this is only active prompt context
        ...activePrompts
          .map((prompt) => [
            { role: 'user', content: prompt.user },
            { role: 'assistant', content: prompt.assistant },
          ])
          .flat(),
        { role: 'user', content: 'Hey! What is NoteRep?' },
        {
          role: 'assistant',
          content:
            'Welcome to NoteRep (https://noterep.vercel.app), developed by Shravan, An Open-Source Notes Sharing Platform. NoteRep centralizes all class notes, PPTs, and study materials to simplify and enhance your learning experience. Need help or looking for specific materials? Just ask or explore this NoteRep website!',
        },
        // this is users past context
        ...pastResponses.flatMap((entry, index) => [
          lastTwoEntries[index],
          entry,
        ]),
        { role: 'user', content: userQuery },
      ],
      temperature: 0.7,
    })
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API}`,
    }
    let json_body = JSON.parse(body)
    // console.log('Request:', json_body)

    try {
      const response = await fetch(endpoint, { method: 'POST', headers, body })
      const data = await response.json()
      setCompleteResponse(data)
      const message = data.choices[0].message.content
      const responseTime = data.usage.total_time.toFixed(2)
      setApiResponse(message)
      setChatHistory((prevHistory) =>
        prevHistory.map((item, idx) =>
          idx === prevHistory.length - 1
            ? { ...item, response: message, responsetime: responseTime }
            : item
        )
      )
      // toast.success(`Response time: ${data.usage.total_time.toFixed(2)}`, {
      //   position: 'top-center',
      //   autoClose: 2000,
      //   hideProgressBar: true,
      //   theme: 'dark',
      // })
      saveChatHistory(userQuery, message, responseTime)
    } catch (error) {
      console.error('Error:', error)
      setApiResponse('Error fetching response')
      saveChatHistory(userQuery, 'Error fetching response')
      setChatHistory((prevHistory) =>
        prevHistory.map((item, idx) =>
          idx === prevHistory.length - 1
            ? { ...item, response: 'Error fetching response', responsetime: 0 }
            : item
        )
      )
    } finally {
      setIsLoading(false)
      setUserQuery('')
    }
  }

  return (
    <>
      <ToastContainer />
      <section className="relative bg-indigo-50 px-2 pb-8 dark:bg-gray-900 sm:pb-2 sm:pt-2">
        <div className="container mx-auto max-w-lg rounded-lg bg-white p-2 shadow-lg dark:bg-slate-950 sm:p-5 md:max-w-xl lg:max-w-3xl">
          <div className="max-h-96 overflow-y-auto pt-2">
            {chathistory.length > 0 && (
              <ul className="space-y-2 p-2">
                {chathistory.slice(-3).map((chat, index) => (
                  <li key={index} className="flex flex-col p-2">
                    <div className="mb-2 flex justify-end">
                      <p className="lg:text-md mb-2 inline-block rounded-xl bg-blue-200 p-2 text-sm text-gray-700 dark:bg-blue-700 dark:text-indigo-100">
                        {/* <strong className="">You:</strong>  */}
                        {chat.query}
                      </p>
                    </div>
                    <div className="flex justify-start">
                      <p className="lg:text-md rounded-xl bg-slate-100 p-2 text-sm text-gray-700 dark:bg-slate-700 dark:text-indigo-100">
                        <ChatHistoryAIResponse
                          text={chat.response}
                          responsetime={chat.responsetime}
                        />
                      </p>
                    </div>
                  </li>
                ))}
                <div ref={chatEndRef} />
              </ul>
            )}
          </div>
          {/* {apiResponse && (
            <div className="mt-2 rounded bg-gray-100 p-3 text-center text-sm text-gray-700 dark:bg-gray-700 dark:text-indigo-200 lg:text-lg">
              <AIResponse text={apiResponse} response={completeresponse} />
            </div>
          )} */}
          <div className="mb-2 flex items-center gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="mt-4 flex-1 rounded-md border border-gray-400 bg-slate-100 px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-200 dark:bg-slate-700 dark:text-white"
            />
            <div className="mt-4 flex justify-center">
              <button
                onClick={makeApiCall}
                className="h-8 w-10 rounded-md border bg-blue-500 px-2 py-1 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 dark:border-blue-100"
                disabled={isLoading || !userQuery.trim()}
              >
                {isLoading ? <LoadingBtn /> : <SendBtn />}
              </button>
            </div>
          </div>
          <div className="mt-2 text-center text-gray-600 dark:text-gray-400">
            <p className="text-xs italic">
              Note: This AI Bot can’t directly fetch notes just yet — but stay
              tuned! The future might surprise us.
            </p>
            {/* <button
              className="rounded-md border bg-gray-800 p-1"
              onClick={() => setUserQuery('Who are you?')}
            >
              Who are you?
            </button>{' '}
            |{' '}
            <button
              className="rounded-md border bg-gray-800 p-1"
              onClick={() => setUserQuery('What is NoteRep?')}
            >
              What is NoteRep?
            </button> */}
          </div>
        </div>
      </section>
    </>
  )
}
