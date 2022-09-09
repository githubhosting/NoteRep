import Image from 'next/image'

import { ButtonLink } from '@/components/Button2'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
        <Image
          src={backgroundImage}
          alt=""
          width={2347}
          height={1244}
          layout="fixed"
          unoptimized
        />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <p className="mt-0 mb-2 text-lg font-bold tracking-tight text-white">
            MSRIT Events:
          </p>
          <ButtonLink
            href="https://githubhosting.github.io/eventcalender/"
            color="white"
            className="mt-0 mb-10 shadow-md"
            target="_blank"
          >
            Events Calendar
          </ButtonLink>
          <br></br>
          <ButtonLink
            href="https://amith225.github.io/webHosting/gpa%20calculator/"
            color="white"
            className="mb-5 shadow-md"
            target="_blank"
          >
            CGPA Calculator
          </ButtonLink>
          {/* <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2> */}
          {/* <p className="mt-4 text-lg tracking-tight text-white">
            It’s time to take control of your books. Buy our software so you can
            feel like you’re doing something productive.
          </p> */}
          <p className="mt-0 text-lg tracking-tight text-white">
            <span className="font-bold drop-shadow-lg">Chemistry Cycle:</span>
          </p>
          <ButtonLink
            href="https://drive.google.com/drive/folders/1f2gtx6cDE8Av829fkzyLWl3-AEDBZSWF?usp=sharing"
            color="white"
            className="mt-5 shadow-xl"
          >
            Previous Year Papers
          </ButtonLink>
          <br></br>
          <ButtonLink
            href="https://drive.google.com/drive/folders/1M-nox11_GeNdacU_4xV8q6yyrOsxqvxY?usp=sharing"
            color="white"
            className="mt-5 shadow-xl"
          >
            SEE Papers Year wise
          </ButtonLink>
          <p className="mt-10 text-lg tracking-tight text-white">
            <span className="font-bold drop-shadow-lg">Physics Cycle:</span>
          </p>
          <ButtonLink
            href="https://drive.google.com/drive/folders/1cM8xMWFAUACsVdopjyrIxDuAiO6ux8Ml?usp=sharing"
            color="white"
            className="mt-5 shadow-xl"
          >
            Previous Year Papers
          </ButtonLink>
          <br></br>
          <ButtonLink
            href="https://drive.google.com/drive/folders/1w6lR16CXz6fRYqc6ZxNHA3y4uYK7EKF-?usp=sharing"
            color="white"
            className="mt-5 shadow-xl"
          >
            SEE Papers Year wise
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
