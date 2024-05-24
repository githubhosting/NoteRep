import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
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
        <title>
          Syllabus GPT - by Shravan | An instant assistance and comprehensive
          responses to your subject syllabus.
        </title>
        <meta
          name="description"
          content="Syllabus GPT - An instant assistance and comprehensive responses to your subject."
        />
        <meta name="theme-color" content="black-translucent" />
        <meta
          name="google-site-verification"
          content="gYJr3zyNUad36lu_-fZx1x5r272Wt_RBB26MWCSYxPA"
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
        <section className="relative bg-indigo-50 py-7 pb-10 dark:bg-gray-900 sm:py-10">
          <div className="relative mx-auto max-w-7xl px-1 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
              <iframe
                className="aspect-auto rounded-xl shadow-lg"
                src="https://vtu-syllabus-gpt.streamlit.app/?embed=true"
                width="100%"
                height="1000"
              ></iframe>
              <p className="mt-8 text-center tracking-wider">
                Please wait for 10 seconds for the response to load after you click Ask AI.<br></br>
                For better experience, switch to full screen mode.
              </p>
            </div>
          </div>
        </section>
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
