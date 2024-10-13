import Head from 'next/head'
import { Container } from '@/components/Container'
import { Transition } from '@headlessui/react'
import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeaderMod } from '@/components/HeaderMod'
import { Hero } from '@/components/Hero'
import { Content } from '@/components/Content'
import { Author } from '@/components/Author'
import chevronup from '@/images/chevronup.svg'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Timetable } from '@/components/Timetable'
import { Calendar } from '@/components/Calendar'
import { GCalendar } from '@/components/GoogleCalendar'
import { Counter } from '@/components/Calendar'
import { Button } from '@/components/Button'
import { ContentNew } from '@/components/ContentNew'

const subjects = [
  {
    Day: 'Monday',
    subject: [
      'DCN',
      'DCN',
      'Algo Lab',
      'Algo Lab',
      '-',
      'Web',
      'ES/Web Lab',
      'Es/Web Lab',
    ],
  },
  {
    Day: 'Tuesday',
    subject: ['DAA', 'AI', 'OS', 'DCN', '-', 'Math Tut', 'Math Tut', '-'],
  },
  {
    Day: 'Wednesday',
    subject: ['DCN Lab', 'DCN Lab', 'Maths', 'AI', '-', 'DAA', 'AEC', '-'],
  },
  {
    Day: 'Thursday',
    subject: [
      'Math',
      'AI',
      'DAA',
      'AEC',
      '-',
      'OS',
      'ES/Web Lab',
      'Es/Web Lab',
    ],
  },
  {
    Day: 'Friday',
    subject: [
      'Math',
      'OS',
      'Algo Lab',
      'Algo Lab',
      '-',
      'Procter Meet',
      'Dept-',
      '-Activity',
    ],
  },
  {
    Day: 'Saturday',
    subject: ['OS', 'OS', 'AM41 ', 'AM41', '-', '-', '-', '-'],
  },
]

const links = {
  // syllabus: '#',
  timetable: '#',
  curriculum: '#',
}

const cseaimlsem5 = [
  {
    title: 'Big Data Analytics',
    description: '(3:0:0) CI51',
    link: 'https://drive.google.com/drive/folders/1yKpnOtQxkLoiu5puvEkUBZmDS1rjt3YX?usp=drive_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Machine Learning',
    description: '(2:0:1) CI52',
    link: 'https://drive.google.com/drive/folders/1zqn9poZMiHQbKib3mCKNgWX-I6I_2h_N?usp=sharing',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Automata Theory and Compiler Design',
    description: '(2:0:1) CI53',
    link: 'https://drive.google.com/drive/folders/1x4ECw1TWAmfzgytKWTN-ReMyWz13bM05?usp=drive_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Software Engineering',
    description: '(3:0:0) CI54',
    link: 'https://drive.google.com/drive/folders/1lwH45jAUJNsM1NwZ8WPIRYZZ4KAhDEuR?usp=drive_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Advanced Computer Networks',
    description: '(3:0:0) CIE552',
    link: 'https://drive.google.com/drive/folders/1-pmiBr3mpl9IXmKJOCGgGb6QP2H3MPtb?usp=drive_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Research Methodology',
    description: '(3:0:0) AL58',
    link: 'https://drive.google.com/drive/folders/1XfSpA_pr-RaGzJLyICh5RtguPXX51KLz?usp=drive_link',
    otherlink: '/links',
    tag: '',
  },
]

export default function Home() {
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

  const [isShowing, setIsShowing] = useState(false)
  const [enabled, setEnabled] = useState(false)

  const examDate = new Date('2021-12-17T00:00:00')
  const today = new Date()
  const diff = examDate.getTime() - today.getTime()
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  const [counter, setCounter] = useState(seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head>
        <title>CSE (AI & ML) 4th Sem Notes</title>
        <meta
          name="description"
          content="NoteRep - Links to CSE(AI & ML) and Cyber Security Notes for 4th Semester"
        />
        <meta name="theme-color" content="black-translucent" />
        <meta
          name="google-site-verification"
          content="gYJr3zyNUad36lu_-fZx1x5r272Wt_RBB26MWCSYxPA"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="noterep, notes, notes sharing, notes msrit, noterep.vercel.app, cse aiml notes, cse cy notes, cse notes, msrit notes, msrit cse notes, msrit cse aiml notes, msrit"
        />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <div className="bg-indigo-50 dark:bg-cost5 dark:text-white">
        <HeaderMod />
        <Container>
          <h2 className="pb-5 pt-8 text-center text-lg font-semibold tracking-tight text-gray-900 dark:text-white md:text-xl">
            5th Sem Notes Links for CSE(AI & ML)
          </h2>
          <div className="flex flex-row items-center justify-center gap-2 py-3 lg:p-5">
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
              {enabled ? 'Hide Calendar' : 'Show Calendar'}
            </p>
          </div>
          <div
            style={{
              opacity: enabled ? 1 : 0,
              transition: 'opacity 150ms ease-in-out',
              height: enabled ? 'auto' : '0',
              overflow: 'hidden',
            }}
          >
            {/* <Counter /> */}
            {/* <Calendar /> */}
            <GCalendar url="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&bgcolor=%23ffffff&title=CSE(AI%26ML)%20Sem%205&mode=MONTH&showTz=0&showPrint=0&showTabs=0&showCalendars=0&src=ZDg4NjQ2MTZmMmQ3MGQwOTRlYjcxMGRjZDk2YmQxZGZlNzE2YmRmZGZiMWUzOGUwNWFlYTFiNzdhZTQ3ZjUxNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5" />
          </div>
        </Container>
        {/* <Timetable subjects={subjects} /> */}
        <ContentNew drive={cseaimlsem5} links={links} />
        <Author />
      </div>
      <Footer />
      {showButton && (
        <button onClick={scrollToTop} className="back-to-top">
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
