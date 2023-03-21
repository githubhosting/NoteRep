import Image from 'next/image'
import { usePWAInstall } from 'react-use-pwa-install'
import React from 'react'
import { useState } from 'react'
import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background.jpg'
import darkbackgroundImage from '@/images/background-dark.jpg'
import { check } from 'prettier'
export function Hero() {
  const install = usePWAInstall()

  return (
    <>
      <section className="relative bg-indigo-50 py-7 pb-10 dark:bg-gray-900 sm:py-10">
        {/* <div className="absolute -inset-x-0 -top-48 -bottom-14 overflow-hidden bg-indigo-50 dark:bg-gray-900">
          <div className="absolute top-0 left-0 -translate-y-[10%] -translate-x-[55%] -scale-x-100 sm:left-1/2 sm:-translate-y-[6%] sm:-translate-x-[98%] lg:-translate-x-[106%] xl:-translate-x-[122%]">
            <Image
              src={backgroundImage}
              alt=""
              layout="fixed"
              width={918}
              height={1495}
              priority
              unoptimized
              className="opacity-70 dark:opacity-0"
            />
          </div>
        </div> */}
        <Container className="relative">
          <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
            <h1 className="noterep_text_gradient font-display text-5xl font-bold tracking-tighter text-transparent drop-shadow-xl dark:drop-shadow-light sm:text-7xl">
              NoteRep
            </h1>
            <div className="mt-6 space-y-6 font-sans text-2xl tracking-tight text-blue-900 dark:text-[#fefefe]">
              <p>An Open-Source Notes Sharing Platform</p>
              <p className="text-base font-semibold">
                Please let me know if there are any errors or if you want to
                update anything in the notes.
              </p>
              <p className="text-base font-semibold">
                You can also contribute to this project by adding more notes.{' '}
                <br></br>
                <a
                  className="font-bold"
                  href="https://drive.google.com/drive/folders/1qRi18giG_H8Zr8KtlSyVNCbjp2UruvRp?usp=sharing"
                >
                  Click here to upload
                </a>
              </p>
              {/* <p className="text-base font-semibold">
                You can now simply search <i className="font-bold">"noterep"</i>{' '}
                on google and find this website listing in the top results of
                Google searches. That's pretty cool, isn't it? A big thanks to{' '}
                <a
                  className="font-bold underline"
                  href="https://www.linkedin.com/in/gautam-menon-9a30a3233/"
                >
                  Gautam Menon
                </a>{' '}
                for suggesting this name.
              </p> */}
              <p className="text-base font-normal">
                Anyone interested in collecting notes for other branches can{' '}
                <a
                  className="font-semibold underline"
                  href="https://wa.me/919945332995?text=Hey, This is regarding NoteRep ..."
                >
                  approach me.
                </a>
              </p>

              {install && (
                <button
                  id="button"
                  class="hover:glow dark:highlight-white/20 group flex cursor-pointer items-center justify-between overflow-hidden rounded-md bg-blue-500 text-white shadow transition-all dark:bg-blue-700 dark:shadow-5xl dark:hover:bg-blue-400"
                  onClick={install}
                >
                  <p class="px-4 py-1 text-xl shadow-lg">Install App</p>
                </button>
              )}
            </div>

            <div className="mt-10 flex flex-col items-start justify-start gap-5 lg:flex-row">
              <ButtonLink href="/ci" className="rounded-lg py-2">
                CSE (AI ML & CY ) Notes (Sem 3)
              </ButtonLink>
              <ButtonLink href="/syllabus" className="rounded-lg py-2">
                CI & CY Curriculum
              </ButtonLink>
            </div>
            <div className="mt-6 flex items-center justify-start">
              <ButtonLink href="/ci1styear" className="mt-5 rounded-lg py-2">
                CSE (AI & ML) 1st year Time Table
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
