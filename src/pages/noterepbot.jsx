import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Bot } from '@/components/Bot'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

export default function NoterepBot_() {
  const [showButton, setShowButton] = useState(false)

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
        <title>AI Bot - Noterep Chat Bot</title>
        <meta
          name="description"
          content="Noterep Chat Bot - An AI Bot to help you with your notes."
        />
        <meta name="theme-color" content="black-translucent" />
        <meta
          name="google-site-verification"
          content="DPpz834E16UpWaEWBrvGKyPEdkGHggpb6UwrQkBKqXs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="noterep, notes, notes sharing, notes msrit, noterep.live"
        />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <Header />
      <main>
        <Bot />
      </main>
      <Footer />
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
    </>
  )
}
