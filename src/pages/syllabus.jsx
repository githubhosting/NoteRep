import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { HeaderMod } from '@/components/HeaderMod'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { Container } from '@/components/Container'
import { ButtonLink } from '@/components/Button1'

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
      behavior: 'smooth', // for smoothly scrolling
    })
  }
  return (
    <>
      <Head>
        <title>Syllabus for CSE (AI & ML) and Cyber Security</title>
        <meta
          name="description"
          content="NoteRep - Drive links for all the Shared Notes and Online Study Material for Students"
        />
      </Head>
      <HeaderMod />
      <main>
        <section
          id="Syllabus"
          aria-labelledby="introduction-title"
          className="bg-indigo-50 pb-0 pt-5 dark:bg-cost5 sm:pb-0 md:pt-8 lg:pt-5"
        >
          <Container>
            <h1 className="text-center font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Updated 4th Sem Syllabus for CSE (CI & CY)
            </h1>
            <div className="flex justify-center pt-10">
              <ButtonLink
                href="/documents/Updated 4th Sem Syllabus (CI & CY).pdf"
                rel="noreferrer"
                target="_blank"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500"
              >
                Click here to Download
              </ButtonLink>
            </div>
            <div className='flex justify-center'>
              <iframe
                src="https://drive.google.com/file/d/18oRQz24ruAVxvFF9LDUUP6HWwba0z_0p/preview"
                height="1024"
                allow="autoplay"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
                className="mt-10 w-full max-w-3xl rounded-md lg:rounded-xl"
              ></iframe>
            </div>
          </Container>
        </section>
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
