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
import { Timetable } from '@/components/Timetable3'
import { Calendar } from '@/components/Calendar'
import { Counter } from '@/components/Calendar'
import { Button } from '@/components/Button'
import { ContentNew } from '@/components/ContentNew'

const cicy3 = [
  {
    title: 'All Subject Folder',
    description: 'Main Folder Drive Link',
    link: 'https://drive.google.com/drive/folders/19FylQDEwam6JZNnCvf7_CcSF8WoB9brt?usp=sharing',
    otherlink: '#',
    tag: '',
  },
  {
    title: 'Linear Algebra & Integral Transforms',
    description: '(2:1:0) CI31',
    link: 'https://drive.google.com/drive/folders/1d126yrfEwfL1QqEL9cJcl3SHP6skil0G?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Data Base Management Systems',
    description: '(3:0:0) CI32',
    link: 'https://drive.google.com/drive/folders/1Jp1yODvx1-EO5SywKVLxsVdsqLYAf_d7?usp=share_link',
    otherlink: '/links',
    tag: 'SQL',
  },
  {
    title: 'Data Structures',
    description: '(3:0:0) CI33',
    link: 'https://drive.google.com/drive/folders/1xKwDfh47KlX5yOFw_zPK7gHJwnd64gIC?usp=share_link',
    otherlink: '/links',
    tag: 'C Programming',
  },
  {
    title: 'Computer organization and Architecture',
    description: '(3:0:0) CI34',
    link: 'https://drive.google.com/drive/folders/1sGeLN9AV2mPm3CxNCz8Ws9u0nwHNY33k?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Discrete Mathematical Structures',
    description: '(2:1:0) CI35',
    link: 'https://drive.google.com/drive/folders/1UjfYJyCRSz8KtQeWxnypGEz9q1uIBbSs?usp=share_link',
    otherlink: '/links',
    // tag: 'Maths',
  },
  {
    title: 'Data Structures Laboratory',
    description: '(0:0:1) CIL36',
    github: 'https://github.com/githubhosting/DS_Lab_c-programming_Personal',
    otherlink: 'https://github.com/githubhosting/DS_Lab_c-programming',
    extra: 'This is github repository',
    tag: 'C Programming',
  },
  {
    title: 'OOPS Laboratory',
    description: '(0:0:1) CIL37',
    github: 'https://github.com/githubhosting/OOPS_Lab_CPP',
    otherlink: '/links',
    extra: 'This is github repository',
    tag: 'C++',
  },
  {
    title: 'Universal Human Value Course ',
    description: '(2:0:0) UHV38',
    link: 'https://drive.google.com/drive/folders/1i6_X176UpyXi_aufwXyWcLiHVgpD6yEz?usp=sharingl̥',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Kannada (Kali / Manasu)',
    description: '(1:0:0) HS391/491',
    link: 'https://drive.google.com/drive/folders/1MIXAORMZ0GYUFJqYDjsYZbKYEnv8Rgch?usp=share_link',
    otherlink: '/links',
    tag: 'Language',
  },
  {
    title: 'Ability Enhancement Course-III',
    description: '(1:0:0) AEC310',
    link: '#',
    otherlink: '/links',
    tag: '',
  },
]

const links = {
  syllabus1:
    'https://docs.google.com/document/d/e/2PACX-1vQ3ufq062Ks7uHEx_TEOI_yEcv8OBogdiHbMW7dfQnF388pggC5MoHnV7IyZaUvVgbDjQtec6pf0Wat/pub',
  syllabus2:
    'https://docs.google.com/document/d/e/2PACX-1vRFRazfWll_UKmcqEqiLNioIn65WV8lIFmkwOEVjShDxPO4xFMZPOmB3tUN8A0NyDSeHab92K7FYuVC/pub',
  timetable:
    'https://drive.google.com/drive/folders/1HcJSkqZ7xgWW2cymK8EtS5X_7MI5v84F?usp=share_link',
  curriculum: '#',
}

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
        <title>NoteRep | 3rd Sem CSE (AI ML & CY) Notes</title>
        <meta
          name="description"
          content="NoteRep - Links to CSE(AI & ML) and Cyber Security Notes for 3rd Semester"
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
            3rd Sem Notes Links for CSE(AI & ML)
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
        {/* <Timetable /> */}
        <ContentNew drive={cicy3} sem="3rd" links={links} />
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
