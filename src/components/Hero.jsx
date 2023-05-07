import Image from 'next/image'
import { Transition } from '@headlessui/react'
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
              <p className="text-lg">An Open-Source Notes Sharing Platform</p>
              {/* <p className="text-base font-medium">
                Please let me know if there are any errors or if you want to
                update anything in the notes.
              </p> */}
              <p className="text-base font-medium">
                Contribute to this project: Add Notes{' '}
                <a
                  className="text-base underline"
                  href="https://drive.google.com/drive/folders/1qRi18giG_H8Zr8KtlSyVNCbjp2UruvRp?usp=sharing"
                >
                  Here
                </a>
                <br></br>
                You can also upload to the "Upload Here" Folder in Respective
                Subject Folders.
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
                Anyone interested in sharing notes for other branches can{' '}
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
                  <p class="px-3 text-lg shadow-lg dark:shadow-num_d">
                    Install App
                  </p>
                </button>
              )}
              <p className="text-base font-semibold italic">
                Introducing the new beta feature!
              </p>
              <ButtonLink
                href="/noterep-forum"
                className="button-85 rounded-lg py-2 after:bg-blue-700 dark:after:bg-gray-900"
                // target="_blank"
              >
                NoteRep Forum 🚀
              </ButtonLink>
            </div>

            <div className="mt-10 flex flex-col items-start justify-start gap-5 lg:flex-row">
              <ButtonLink
                href="/ci"
                className="w-full rounded-lg py-2 md:w-auto"
              >
                CSE (AI ML & CY ) Notes (Sem 4)
              </ButtonLink>
              <ButtonLink
                href="/syllabus"
                className="w-full rounded-lg py-2 md:w-auto"
              >
                CI & CY Curriculum
              </ButtonLink>
            </div>
            <div className="mt-8 flex items-center justify-start">
              {/* <ButtonLink href="/ci1styear" className="mt-5 rounded-lg py-2">
                CSE (AI & ML) 1st year Time Table
              </ButtonLink> */}
              <a
                href="https://discord.gg/YqqfGsatw4"
                target="_blank"
                className="inline-flex items-center rounded-lg border px-3 py-1 text-base font-medium tracking-tight text-gray-900 shadow-xl hover:shadow-none dark:border-zinc-600 dark:text-white dark:shadow-num_d1 dark:hover:shadow-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-discord"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                </svg>
                <span className="ml-4">Discord</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
