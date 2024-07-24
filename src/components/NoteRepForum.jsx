import Image from 'next/image'
import { usePWAInstall } from 'react-use-pwa-install'
import Confetti from 'react-confetti'
import React from 'react'
import { useEffect, useState } from 'react'
import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background.jpg'
import darkbackgroundImage from '@/images/background-dark.jpg'
import noterepforumPreview from '@/images/noterep-preview.png'
import { check } from 'prettier'
export function NoteRepForum() {
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

  //width and height
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [])

  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={400}
      />
      <section className="relative bg-indigo-50 py-7 pb-10 dark:bg-gray-900 sm:py-10">
        <Container className="relative">
          <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
            <div>
              <h2 className="mb-5 justify-center text-center text-3xl font-bold text-gray-900 dark:text-white">
                NoteRep Forum
              </h2>
              <p className="mb-5 text-center text-lg text-gray-500 dark:text-gray-400">
                Checkout the demo of NoteRep Forum, a beta feature of NoteRep.
              </p>
              <div className="mb-6 rounded-lg bg-blue-700 px-6 py-6 text-center">
                <a
                  href="http://noterep-forum.vercel.app/"
                  className="grad_button2 border border-blue-600 px-4 py-2 font-semibold"
                  target="_blank"
                >
                  NoteRep Forum
                </a>
              </div>
              <Image src={noterepforumPreview} alt="NoteRep Forum Preview" />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
