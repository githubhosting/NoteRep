import Head from 'next/head'
import { Container } from '@/components/Container'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { HeaderMod } from '@/components/HeaderMod'
import { Author } from '@/components/Author'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { ButtonLink } from '@/components/Button'

function SubjectCard(props) {
  return (
    <ul
      role="list"
      className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3 lg:items-center"
    >
      {props.subjects.map((item) => (
        <li className="rounded-xl bg-gradient-to-r from-green-300 via-blue-300 to-purple-600 p-0.5 shadow-lg transition hover:shadow-sm dark:shadow-5xl">
          <div className="rounded-[10px] bg-white p-5 dark:bg-slate-900 sm:p-6">
            <h3 className="text-center text-base font-semibold uppercase text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-1 text-center text-base text-gray-700 dark:text-slate-400">
              {item.description}
            </p>
            <div className="flex justify-center">
              <a href={item.link} target="_blank">
                <button className="mt-2 rounded-lg border bg-transparent px-4 py-2 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-900 hover:text-white dark:border-gray-500 dark:text-slate-100 dark:shadow-num_d0 hover:dark:text-white">
                  View
                </button>
              </a>
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
  )
}
const subjects = [
  {
    title: 'Advanced Calculus',
    description: 'MA11 | Mathematics',
    link: 'https://drive.google.com/drive/folders/1ocboxyZqKUF8PcoPQCNcN1qW6_98s8py',
  },
  {
    title: 'Communicative English',
    description: 'HS12 | Humanities',
    link: 'https://drive.google.com/drive/folders/1wZFskaydriaWIrOeHMSNutNtV-55fqFx?usp=sharing',
  },
  {
    title: 'Basic Electrical Engineering',
    description: 'EE13 | Electrical & Electronics',
    link: 'https://drive.google.com/drive/folders/1oetzNGC020UfqQ8hMeyIxFRcO2fdJhVZ?usp=sharing',
  },
  {
    title: 'Basics Of Civil Engineering & Mechanics',
    description: 'CV14 | Civil Engineering',
    link: 'https://drive.google.com/drive/folders/1hfv8E8kByN9KcDElYJI1ZWqPIZYZmavg',
  },
  {
    title: 'Design Thinking',
    description: 'AEC26',
    link: 'https://drive.google.com/drive/folders/1aPjpHh6apHApF2sW9U88KFEn28csTpUh?usp=sharing',
  },
  {
    title: 'Engineering Physics',
    description: 'PY15 | Physics',
    link: 'https://drive.google.com/drive/folders/1HfYqOlmGppRU_lFEqcJ1SwkDxiRfUxKN?usp=sharing',
  },
  {
    title: 'Computer Aided Engineering Drawing',
    description: 'MEL17 | Mechanical Engineering',
    link: 'https://drive.google.com/drive/folders/1n9pDB2weAQ2qyuPfwA_69XmtO5wbN9wd?usp=sharing',
  },
  {
    title: 'Engineering Physics Laboratory',
    description: 'PYL18 | Physics',
    link: 'https://drive.google.com/drive/folders/1Hd-LMODhxKe3Vogyl2tdBGLpj_sv79Ms?usp=sharing',
  },
  {
    title: 'Multivariate Calculus & Differential Equations',
    description: 'MA21 | Mathematics',
    link: 'https://drive.google.com/drive/folders/1nDwJtyynb8V-N0afwfSuXWDCQK9MFyFt?usp=sharing',
  },
  {
    title: 'Fundamentals Of Mechanical Engineering',
    description: 'ME22 | Mechanical Engineering',
    link: 'https://drive.google.com/drive/folders/14UBANxwD6X3w7R4z_LbGxlx8bL7iizwW?usp=sharing',
  },
  {
    title: 'Basic Electronics',
    description: 'EC23 | EC/ET',
    link: 'https://drive.google.com/drive/folders/16hJtglzOMFIZgi1I4CmmWvNVTzfEa_lz?usp=sharing',
  },
  {
    title: 'Computing Fundamentals And C Programming',
    description: 'CS24 | CSE/ISE',
    link: 'https://drive.google.com/drive/folders/1qR61EoAEOu2kaTtDUoV7NQY3dGl326AP?usp=sharing',
  },
  {
    title: 'Engineering Chemistry',
    description: 'CY25 | Chemistry',
    link: 'https://drive.google.com/drive/folders/1PwOQv5aGNb7A-YBq9Jg3GEca_3D12IlJ?usp=sharing',
  },
  {
    title: 'A Scientific Approach To Health',
    description: 'AEC26',
    link: 'https://drive.google.com/drive/folders/1hhpslVlioi_ctjRHd9yBdFfFDteq0zFP?usp=sharing',
  },
  {
    title: 'Engineering Chemistry Laboratory',
    description: 'CYL27 | Chemistry',
    link: 'https://drive.google.com/drive/folders/1PhVaeiy233wPPst8t6kBf05YdyMfn9Cf?usp=sharing',
  },
  {
    title: 'C Programming Laboratory',
    description: 'CSL28 | CSE/ISE',
    link: 'https://drive.google.com/drive/folders/11hGw83CGCKOnAg_gvmEzzpxilcXVJYeB?usp=sharing',
  },
  {
    title: 'Workshop Practice',
    description: 'MEL29 | Mechanical Engineering',
    link: 'https://drive.google.com/drive/folders/1RSYS98m7xz8JcRRuxHubaZZvYLfuRNjE?usp=sharing',
  },
]

export default function FirstYear() {
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
      behavior: 'smooth', // for smoothly scrolling
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
          content="9l6jBCdCjl0ZW1Q6RrsllF3h9y5WdO-_rNvO1BKgH9s"
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
          <div className="mx-auto max-w-5xl sm:text-center">
            <div className="flex flex-col items-center justify-center gap-3 pt-5 md:flex-row">
              <ButtonLink
                href="#"
                className="mt-5 w-auto rounded-lg py-2 hover:bg-blue-900"
              >
                Syllabus
              </ButtonLink>
              <ButtonLink href="#" className="mt-5 w-auto rounded-lg py-2">
                Previous Year Papers
              </ButtonLink>
            </div>
            <div className="flex justify-center">
              <ButtonLink
                target="_blank"
                href="#"
                className="hover:shadowpress mt-6 w-auto rounded-lg bg-blue-50 py-2 shadow-lg dark:text-white dark:hover:text-blue-200"
              >
                CIE Portions (Tentative)
              </ButtonLink>
            </div>
          </div>
          <SubjectCard subjects={subjects} />
        </Container>
        {/* <Author /> */}
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
