import Image from 'next/image'
import { usePWAInstall } from 'react-use-pwa-install'
import React from 'react'
import { useState } from 'react'
import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background.jpg'
import darkbackgroundImage from '@/images/background-dark.jpg'
import noterepforumPreview from '@/images/noterep-preview.png'
import { check } from 'prettier'
export function NoteRepForum() {
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
    alert('Thank you for signing up!')
  }

  return (
    <>
      <section className="relative bg-indigo-50 py-7 pb-10 dark:bg-gray-900 sm:py-10">
        <Container className="relative">
          <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
            <div>
              <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white">
                NoteRep Forum
              </h2>
              <p className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Checkout the demo version
              </p>
              <Image src={noterepforumPreview} alt="NoteRep Forum Preview" />
            </div>
            <div className="mb-5 rounded-lg bg-blue-700 px-6 py-6 text-center">
              <a
                href="http://noterep-forum.vercel.app/"
                className="grad_button2 border border-blue-600 py-2 px-4 font-semibold"
                target="_blank"
              >
                NoteRep Forum
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
