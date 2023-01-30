import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import LogoImage from '@/images/logos/msrlogo_1.svg'

import Image from 'next/image'

export function HeaderMod() {
  return (
    <header className="relative z-50 pb-1 lg:pt-11">
      <Container className="i tems-center flex  flex-wrap justify-center sm:justify-between lg:flex-nowrap">
        <div className="sm:mt-5 lg:mt-0 lg:grow lg:basis-0">
          <img
            className="collapse h-8 sm:h-8 md:h-8 lg:h-16"
            src="/msrlogo_1.svg"
            alt="NoteRep"
          />
        </div>
        <div className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm text-blue-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
          <div className="mx-auto flex items-center space-x-4 px-4">
            <p className="font-sans font-bold">
              <span className="font-normal">Welcome to Notes </span>Repository
            </p>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
              <a href="/">Home</a>
            </button>
            {/* <svg
              aria-hidden="true"
              className="h-1.5 w-1.5 overflow-visible fill-current stroke-current"
            >
              <path
                d="M3 0L6 3L3 6L0 3Z"
                strokeWidth={2}
                strokeLinejoin="round"
              />
            </svg>
            <p>An Open-Source Notes Sharing Platform</p> */}
          </div>
        </div>
        {/* <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <ButtonLink href="#">Get your tickets</ButtonLink>
        </div> */}
      </Container>
      {/* <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className=" lg:mt-0 lg:grow lg:basis-0">
          <a href="/">
            <img
              className="collapse flex h-20 sm:h-8 md:h-8 lg:h-24"
              src="/msrlogo_1.svg"
              alt="NoteRep"
            />
          </a>
        </div>
        <div className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm text-blue-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
          <div className="mx-auto flex items-center space-x-4 px-4">
            <p className="font-sans font-bold">
              <span className="font-normal">Welcome to Notes </span>Repository
            </p>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
              <a href="/">Home</a>
            </button>
          </div>
        </div>
      </Container> */}
    </header>
  )
}
