import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Bot } from '@/components/Bot'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { Switch } from '@headlessui/react'

export default function NoterepBot_() {
  const [showButton, setShowButton] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [userId, setUser] = useState('')

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Dark Mode
  useEffect(() => {
    let userId = localStorage.getItem('userId')
    setUser(userId)
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

  return (
    <>
      <Head>
        <title>AI Bot - NoteRep Chat Bot</title>
        <meta
          name="description"
          content="NoteRep AI Chat Bot - An Contextual Bot that responds faster than the speed of light."
        />
        <meta name="theme-color" content="black-translucent" />
        <meta
          name="google-site-verification"
          content="gYJr3zyNUad36lu_-fZx1x5r272Wt_RBB26MWCSYxPA"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="noterep, notes, notes sharing, notes msrit, noterep.vercel.app"
        />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col justify-between bg-indigo-50 dark:bg-gray-900">
          <div className="mx-2 mb-2 max-w-3xl rounded-lg bg-indigo-50 px-4 py-2 shadow dark:bg-slate-800 sm:px-6 lg:mx-auto lg:w-full lg:px-8">
            <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              NoteRep AI Chat Bot
            </h1>
            <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-200">
              An AI Bot that responds faster than the speed of light.
            </p>
            {/* <p className="text-center text-xs italic text-gray-600 dark:text-gray-400">
              It can't provide the notes. But you can have fun with it.
            </p> */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              Session ID: {userId}
            </p>
            {/* add a toogle for fun mode  */}
            <div className="flex flex-row items-center justify-center gap-2 py-3">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? 'bg-blue-600' : 'bg-white dark:bg-gray-500'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-gray-200 transition dark:bg-white`}
                />
              </Switch>
              <p className="text-xs font-semibold text-slate-900 dark:text-zinc-50">
                {enabled ? 'Fun Mood' : 'Regular Mood'}
              </p>
            </div>
          </div>
          <Bot />
        </main>
        {/* <Footer /> */}
        {showButton && (
          <button onClick={scrollToTop} className="back-to-top shadow-lg">
            <ArrowCircleUpIcon
              sx={{
                fontSize: '40px',
                width: 40,
                height: 40,
                padding: 0.7,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #002a8f, #00b5f5)',
              }}
            />
          </button>
        )}
      </div>
    </>
  )
}
