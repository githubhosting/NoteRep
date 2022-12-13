import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { HeaderMod } from '@/components/HeaderMod'
import { Hero } from '@/components/Hero'
import { Content } from '@/components/Content'
import { ContentSylCy } from '@/components/ContentSylCy'
import { Newsletter } from '@/components/Newsletter'
import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'
import { Author } from '@/components/Author'
import { CallToAction } from '@/components/CallToAction'
import { Introduction } from '@/components/Introduction'
import { FreeChapters } from '@/components/FreeChapters'
import chevronup from '@/images/chevronup.svg'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'

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
        <title>CURRICULUM for CSE Cyber Security</title>
        <meta
          name="description"
          content="Open-Source platform for Engineering Lecture Notes and Online Study Material for Students"
        />
      </Head>
      <HeaderMod />
      <main>
        <ContentSylCy />
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
