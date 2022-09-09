import Image from 'next/image'

import { ButtonLink } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background.jpg'

export function Hero() {
  return (
    <div className="relative pb-20 sm:py-12">
      <div className="absolute -inset-x-0 -top-48 -bottom-14 overflow-hidden bg-indigo-50">
        <div className="absolute top-0 left-0 -translate-y-[10%] -translate-x-[55%] -scale-x-100 sm:left-1/2 sm:-translate-y-[6%] sm:-translate-x-[98%] lg:-translate-x-[106%] xl:-translate-x-[122%]">
          <Image
            src={backgroundImage}
            alt=""
            layout="fixed"
            width={918}
            height={1495}
            priority
            unoptimized
          />
        </div>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter text-blue-600 drop-shadow-xl sm:text-7xl">
            <span className="sr-only">StudyConf - </span>NoteRep -
          </h1>
          <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-blue-900">
            <p>An Open-Source Notes Sharing Platform</p>
            <p className="text-base">
              If you find any errors or want to update something here, do inform
              us.
            </p>
            <p className="text-xl font-bold">
              I hope my website has helped you in your preparation.{'  '}
              <a
                href="/#sponsors"
                className="link text-blue-600 underline visited:text-blue-600 hover:text-blue-800"
              >
                By scrolling down 
              </a>
              , {'  '}&darr; Please take a look at our affiliated platform.
            </p>
            <p className="text-lg font-semibold">
              ALL THE BEST for SEM End Exams !!!
            </p>
          </div>
          <ButtonLink href="/#schedule" className="mt-10 w-full">
            Explore
          </ButtonLink>
          <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-10 sm:mt-16 sm:gap-y-10 sm:gap-x-16 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
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
          </dl>
        </div>
      </Container>
    </div>
  )
}
