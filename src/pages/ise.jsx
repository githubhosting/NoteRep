import Head from 'next/head'
import { Container } from '@/components/Container'
import { Transition } from '@headlessui/react'
import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeaderMod } from '@/components/HeaderMod'
import { Hero } from '@/components/Hero'
import { Content } from '@/components/Content4sem'
import { Author } from '@/components/Author'
import chevronup from '@/images/chevronup.svg'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Timetable } from '@/components/Timetable'
import { Calendar } from '@/components/CalendarCSE'
import { Counter } from '@/components/CalendarCSE'
import { Button } from '@/components/Button'
import { ButtonLink } from '@/components/Button'

const cseaimlstatic5 = [
  {
    title: 'Software Engineering',
    description: '(3:0:0) CS51',
    link: 'https://drive.google.com/drive/folders/1IzxXB20f6x6Rn5EIOYBDSQAEiHZ5LCoV?usp=sharing',
    otherlink: '',
    tag: '',
    linkdes: '',
  },
  {
    title: 'Artificial Intelligence',
    description: '(3:0:0) CS52',
    link: 'https://drive.google.com/drive/folders/1tGuBIcBw71iuDXdRayP6J-mVvvLzs9LP?usp=sharing',
    otherlink:
      'https://drive.google.com/drive/folders/1W6rODQ0QdaD08dxEn4HfEXFSmMWwxouK?usp=sharing',
    tag: '',
    linkdes: '',
  },
  {
    title: 'Computer Graphics and VR',
    description: '(3:0:0) CSE552',
    link: 'https://drive.google.com/drive/folders/1SSmqc5Jjta9E8GPX72a8bUQ_RsX3rYKK?usp=sharing',
    otherlink: '',
    tag: '',
    linkdes: '',
  },
  {
    title: 'Database Systems',
    description: '(3:0:0) CS53',
    link: 'https://drive.google.com/drive/folders/1TrOHItdatMPxIc6ZagWFBW6V6hLTFeL3?usp=sharing',
    otherlink: 'https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/index.html',
    tag: '',
    linkdes: 'Yale PPTs',
  },
  {
    title: 'Operating Systems',
    description: '(3:0:0) CS54',
    link: 'https://drive.google.com/drive/folders/1vW68lAoxN0eiD5ON4m1cx1DH7YVLy3EC?usp=sharing',
    otherlink:
      'https://codex.cs.yale.edu/avi/os-book/OS8/os8c/slide-dir/index.html',
    tag: '',
    linkdes: 'Yale PPTs',
  },
  {
    title: 'Cryptography and Network Security',
    description: '(3:0:0) CSE555',
    link: 'https://drive.google.com/drive/folders/17e-3e3mGf_ox6DZIlXUsFd6I4flSF2-B?usp=sharing',
    otherlink: '',
    tag: '',
    linkdes: '',
  },
  {
    title: 'Research Methodology & IPR',
    description: '(3:0:0) AL58',
    link: 'https://drive.google.com/drive/folders/1XfSpA_pr-RaGzJLyICh5RtguPXX51KLz?usp=drive_link',
    otherlink:
      'https://drive.google.com/drive/folders/1ZLGI_ihtI8uZJj24fOrzAEcKI8ochGsX?usp=sharing',
    tag: '',
    linkdes: 'CIE Paper',
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
        <title>CSE Notes and Material</title>
        <meta
          name="description"
          content="NoteRep - Links to CSE Notes and PYQ's for 5th Semester"
        />
        <meta name="theme-color" content="black-translucent" />
        <meta
          name="google-site-verification"
          content="gYJr3zyNUad36lu_-fZx1x5r272Wt_RBB26MWCSYxPA"
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
            5th Sem Notes Links for CSE.
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
        </Container>
        {/* <Timetable /> */}
        <section>
          <Container>
            <div className="mx-auto max-w-5xl sm:text-center">
              <div className="flex flex-col items-center justify-center gap-3 pt-5 md:flex-row"></div>
              <div className="flex justify-center">
                {/* <ButtonLink
                  target="_blank"
                  href="https://docs.google.com/document/d/e/2PACX-1vR8wk2gz-Cnjhn8bQo5afLgVTQO9ZT-uptfjdhASSmwn74kmCm6ETrQrYCpC-jCFUwhf2EKNsW8v2vA/pub"
                  className="hover:shadowpress mt-6 w-auto rounded-lg bg-blue-50 py-2 shadow-lg dark:text-white dark:hover:text-blue-200"
                >
                  Syllabus for 5th Sem
                </ButtonLink> */}
              </div>
            </div>
            <ul
              role="list"
              className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3 lg:items-center"
            >
              {cseaimlstatic5.map((item, index) => (
                <li
                  key={index}
                  className="rounded-xl bg-gradient-to-r from-green-300 via-blue-300 to-purple-600 p-0.5 shadow-lg transition hover:shadow-sm dark:shadow-5xl"
                >
                  <div className="rounded-[10px] bg-white p-5 dark:bg-slate-900 sm:p-6">
                    <h3 className="text-center text-base font-semibold uppercase text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-center text-base text-gray-700 dark:text-slate-400">
                      {item.description}
                    </p>
                    <div className="flex justify-center gap-3">
                      <a href={item.link} target="_blank">
                        <button className="mt-2 rounded-lg border bg-transparent px-4 py-2 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-900 hover:text-white dark:border-gray-500 dark:text-slate-100 dark:shadow-num_d0 hover:dark:text-white">
                          View
                        </button>
                      </a>
                      {item.otherlink && (
                        <a href={item.otherlink} target="_blank">
                          <button className="mt-2 rounded-lg border bg-transparent px-4 py-2 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-900 hover:text-white dark:border-gray-500 dark:text-slate-100 dark:shadow-num_d0">
                            {item.linkdes ? item.linkdes : 'Other Links'}
                          </button>
                        </a>
                      )}
                    </div>
                    {item.tag && (
                      <div className="mt-4 flex flex-wrap justify-center gap-1">
                        <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-900 dark:text-indigo-50">
                          {item.tag}
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Container>
          {/* 7619680062 */}
          <p className="mt-10 text-center text-gray-900 dark:text-white">
            In case of any additions to be made to this drive, do send them to
            Het Joshi{' '}
            <a className="underline" href="tel:7619680062">
              (7619680062)
            </a>
          </p>
        </section>
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
