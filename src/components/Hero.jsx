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
      <div className="relative pb-20 sm:py-12">
        <div className="absolute -inset-x-0 -top-48 -bottom-14 overflow-hidden bg-indigo-50 dark:bg-slate-800">
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
          <div className="dark:bg-gradient-to-w absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white dark:from-black " />
          <div className="dark:bg-gradient-to-w absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-black" />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
            <h1 className="bg-gradient-to-br from-cost4 to-cost3 bg-clip-text font-display text-5xl font-bold tracking-tighter text-transparent drop-shadow-xl dark:text-white sm:text-7xl">
              NoteRep
            </h1>
            <div className="mt-6 space-y-6 font-sans text-2xl tracking-tight text-blue-900 dark:text-slate-400">
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
              <p className="text-base font-semibold">
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
              </p>
              <p className="text-base font-normal">
                Anyone interested in collecting notes for other branches can{' '}
                <a
                  className="font-semibold underline"
                  href="https://wa.me/919945332995?text=Hey, This is regarding NoteRep ..."
                >
                  approach me.
                </a>
              </p>

              <button
                id="button"
                class="hover:glow dark:highlight-white/20 group flex cursor-pointer items-center justify-between overflow-hidden rounded-md bg-blue-500 text-white shadow transition-all dark:bg-sky-500 dark:hover:bg-sky-400"
                onClick={install}
              >
                <p class="p-2 px-5 text-xl shadow-lg ">Install App</p>
              </button>

              {/* <p className="text-xl font-bold">
      I hope my website has helped you in your preparation.{'  '}
      <br></br>Please take a look at our affiliated platform{' '}
      <a
        href="/#sponsors"
        className="link text-blue-600 underline visited:text-blue-600 hover:text-blue-800"
      >
        By scrolling down
      </a>
      {'  '}&darr;, Also there is surprise if you sign up :)
    </p>
    <p className="text-lg font-semibold">
      ALL THE BEST for SEM End Exams !!!
    </p> */}
            </div>

            <div className="mt-10 flex-col items-center justify-center ">
              <ButtonLink href="/ci" className="w-full rounded-lg pt-3 pb-3 ">
                CSE (AI & ML) Notes (Sem 3)
              </ButtonLink>
              <ButtonLink
                href="/cy"
                className="mt-5 w-full rounded-lg pt-3 pb-3"
              >
                CSE Cyber Security Notes (Sem 3)
              </ButtonLink>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <ButtonLink
                href="/syllabus"
                className="mt-5 w-full rounded-lg pt-3 pb-3"
              >
                CI Curriculum
              </ButtonLink>
              <ButtonLink
                href="/syllabus_cy"
                className="mt-5 w-full rounded-lg pt-3 pb-3"
              >
                CY Curriculum
              </ButtonLink>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <ButtonLink
                href="/ci1styear"
                className="mt-5 w-full rounded-lg pt-3 pb-3"
              >
                CSE (AI & ML) 1st year Time Table
              </ButtonLink>
            </div>
            {/* <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-10 sm:mt-16 sm:gap-y-10 sm:gap-x-16 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-center lg:text-center">
      {[
        ['Average visitors*', '56+ /day'],
        ['Total Visits*', '5,000+'],
      ].map(([name, value]) => (
        <div key={name}>
          <dt className="font-mono text-sm text-blue-600">{name}</dt>
          <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-blue-900">
            {value}
          </dd>
        </div>
      ))}
    </dl> */}
          </div>
        </Container>
      </div>
    </>
  )
}
