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

const cseaimlsem4 = [
  {
    title: 'Numerical Techniques and Probability',
    description: '(2:1:0) CI41',
    link: 'https://drive.google.com/drive/folders/1YofEy5hEa78PZ0fa6x9kgVEzK1KyGodR?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Data Communication and Networking',
    description: '(2:0:1) CI42',
    link: 'https://drive.google.com/drive/folders/1HcJSkqZ7xgWW2cymK8EtS5X_7MI5v84F?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Design and Analysis of Algorithms',
    description: '(2:1:0) CI43',
    link: 'https://drive.google.com/drive/folders/1bVTy8hA9HHbqTQyDxXsuz8xsxK0JDM53?usp=sharing',
    classroom: 'https://classroom.google.com/c/NjU3ODA5Mjk0MzA2?cjc=mkw6m35',
    tag: '',
  },
  {
    title: 'Intro to AI',
    description: '(3:0:0) CI44',
    link: 'https://drive.google.com/drive/folders/1W6rODQ0QdaD08dxEn4HfEXFSmMWwxouK?usp=sharing',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Operating System',
    description: '(3:0:0) CI45',
    link: 'https://drive.google.com/drive/folders/1dvSqj7c3uQNdhq2qLu7yFYak5wMVBV3b?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Embedded Systems Lab',
    description: '(0:0:1) CIL46',
    link: 'https://drive.google.com/drive/folders/197mT9sqkxg0BwZU7aZewMeN2aQp32Ppq?usp=share_link',
    otherlink: 'https://github.com/githubhosting',
    extra: 'This is github repository',
    tag: '',
  },
  {
    title: 'Algorithms Lab',
    description: '(0:0:1) CIL47',
    link: 'https://github.com/githubhosting',
    otherlink: '/links',
    extra: 'This is github repository',
    tag: '',
  },
  {
    title: 'Advanced Web Technologies Lab',
    description: '(0:0:1) CIL48',
    link: 'https://github.com/githubhosting/web-technologies-lab',
    otherlink: '/links',
    extra: 'This is github repository',
    tag: '',
  },
  {
    title: 'Data Visualization - AEC',
    description: '(1:0:0) CIAEC49',
    link: 'https://drive.google.com/drive/folders/1Tk7i3tqSQWulVWmrVvEv5g-Sry_d49GD?usp=sharing',
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
          content="DPpz834E16UpWaEWBrvGKyPEdkGHggpb6UwrQkBKqXs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="noterep, notes, notes sharing, notes msrit, noterep.live, cse aiml notes, cse cy notes, cse notes, msrit notes, msrit cse notes, msrit cse aiml notes, msrit"
        />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <div className="bg-indigo-50 dark:bg-cost5 dark:text-white">
        <HeaderMod />
        <Container>
          <h2 className="pb-5 pt-8 text-center text-lg font-semibold tracking-tight text-gray-900 dark:text-white md:text-xl">
            4th Sem Notes Links for CSE(AI & ML)
          </h2>
          <p className="pb-5 text-center text-sm text-gray-600 dark:text-gray-400">
            PLease Verify the syllabus before using these notes
          </p>
          {/* <div className="flex flex-row items-center gap-2 py-3 lg:p-5 justify-center">
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
          <Transition
            show={enabled}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Counter />
            <Calendar />
          </Transition> */}
        </Container>
        <Timetable subjects={subjects} />
        <ContentNew drive={cseaimlsem4} />
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
