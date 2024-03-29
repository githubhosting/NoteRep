import Head from 'next/head'
import { Container } from '@/components/Container'
import { Transition } from '@headlessui/react'
import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeaderMod } from '@/components/HeaderMod'
import { Hero } from '@/components/Hero'
import { ContentNew } from '@/components/ContentNew'
import { Author } from '@/components/Author'
import chevronup from '@/images/chevronup.svg'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Timetable } from '@/components/Timetable'
import { Calendar } from '@/components/Calendar'
import { Counter } from '@/components/Calendar'
import { Button } from '@/components/Button'

const subjects = [
  {
    Day: 'Monday',
    subject: [
      'DL Tut',
      'DL Tut',
      'Entrepreneurship',
      'Cloud Computing',
      '-',
      'Elective',
      'Mini Project',
      'Mini Project',
    ],
  },
  {
    Day: 'Tuesday',
    subject: [
      'Deep Learning',
      'Cloud Computing',
      'Cryptography',
      'Entrepreneurship',
      '-',
      'Elective',
      'Mini Project',
      'Mini Project',
    ],
  },
  {
    Day: 'Wednesday',
    subject: [
      'Cloud Computing',
      'Deep Learning',
      'Cryptography',
      'Entrepreneurship',
      '-',
      'Elective',
      'Mini Project',
      'Mini Project',
    ],
  },
  {
    Day: 'Thursday',
    subject: [
      'Deep Learning',
      'Big Data Lab',
      'Big Data Lab',
      'Big Data Lab',
      '-',
      'Cloud Computing',
      'Cryptography',
      '*',
    ],
  },
  {
    Day: 'Friday',
    subject: [
      'Cryptography',
      'DL Lab',
      'DL Lab',
      'DL Lab',
      '-',
      '*',
      ' * ',
      '*',
    ],
  },
  {
    Day: 'Saturday',
    subject: ['Chill', 'Madi', '-', '-', '-', '-', '-', '-'],
  },
]

const cseaimlsem6 = [
  {
    title: 'Management and Entrepreneurship',
    description: '(3:0:0) AL61',
    link: 'https://drive.google.com/drive/folders/1YofEy5hEa78PZ0fa6x9kgVEzK1KyGodR?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Introduction to Deep Learning',
    description: '(3:0:0) CI62',
    link: 'https://drive.google.com/drive/folders/1HcJSkqZ7xgWW2cymK8EtS5X_7MI5v84F?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Principal of Cryptography',
    description: '(3:0:0) CIE632',
    link: 'https://drive.google.com/drive/folders/1bVTy8hA9HHbqTQyDxXsuz8xsxK0JDM53?usp=sharing',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Cloud Computing',
    description: '(3:0:0) CIE641',
    link: 'https://drive.google.com/drive/folders/1W6rODQ0QdaD08dxEn4HfEXFSmMWwxouK?usp=sharing',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Deep Learning Lab',
    description: '(0:0:1) CIL65',
    link: 'https://drive.google.com/drive/folders/1dvSqj7c3uQNdhq2qLu7yFYak5wMVBV3b?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Big Data Lab',
    description: '(0:0:1) CIL66',
    link: 'https://drive.google.com/drive/folders/197mT9sqkxg0BwZU7aZewMeN2aQp32Ppq?usp=share_link',
    otherlink: 'https://github.com/githubhosting',
    extra: 'This is github repository',
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
        <title>CSE (AI ML & CY) Notes</title>
        <meta
          name="description"
          content="NoteRep - Links to CSE(AI & ML) and Cyber Security Notes for 3rd Semester"
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
        {/* <Container>
          <h2 className="pb-5 pt-8 text-center text-lg font-semibold tracking-tight text-gray-900 dark:text-white md:text-xl">
            5th Sem Notes Links for CSE(AI & ML)
          </h2>
          <div className="flex flex-row items-center gap-2 py-3 lg:p-5 justify-center">
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
          </Transition>
        </Container> */}
        <Timetable subjects={subjects} />
        <ContentNew drive={cseaimlsem6} sem="6th" />
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
