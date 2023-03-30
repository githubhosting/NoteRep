import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeaderMod } from '@/components/HeaderMod'
import { Hero } from '@/components/Hero'
import { Content } from '@/components/Content'
import { Newsletter } from '@/components/Newsletter'
import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'
import { Author } from '@/components/Author1'
import { CallToAction } from '@/components/CallToAction'
import { Introduction } from '@/components/Introduction'
import { FreeChapters } from '@/components/FreeChapters'
import chevronup from '@/images/chevronup.svg'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Timetable1styear } from '@/components/Timetable1styear'

export default function Home() {
  // The back-to-top button is hidden at the beginning
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

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    })
  }
  return (
    <>
      <Head>
        <title>CSE (AI & ML) 1st Year</title>
        <meta
          name="description"
          content="Open-Source platform for Engineering Lecture Notes and Online Study Material for Students"
        />
      </Head>
      <Header />
      <main>
        <Timetable1styear />
        {/* <Content /> */}
        {/* <Author /> */}
      </main>
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
