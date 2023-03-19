import Image from 'next/image'

import { ButtonLink } from '@/components/Button2'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="bg-blue-600 py-10 dark:bg-[#0761d1]"
    >
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
        <Image
          src={backgroundImage}
          alt=""
          width={2347}
          height={1244}
          layout="fixed"
          unoptimized
        />
      </div> */}
      <Container className="py-10">
        <div className="mx-auto max-w-lg text-center">
          <ButtonLink
            href="https://githubhosting.github.io/eventcalender/"
            color="white"
            className="mt-0 mb-5 shadow-md"
            target="_blank"
          >
            Events Calendar
          </ButtonLink>
          <br></br>
          <ButtonLink
            href="https://cgpa-estimator.vercel.app/"
            color="white"
            className="mb-5 shadow-md"
            target="_blank"
          >
            CGPA Estimator
          </ButtonLink>
          <ButtonLink
            href="https://amith225.github.io/webHosting/gpa%20calculator/"
            color="white"
            className="xs:ml-0 mb-5 ml-5 shadow-md lg:ml-5"
            target="_blank"
          >
            CGPA Calculator
          </ButtonLink>
          <p className="mt-0 text-lg tracking-tight text-white">
            <span className="font-bold drop-shadow-lg">Chemistry Cycle:</span>
          </p>
          <div className="flex flex-col justify-center gap-4 md:flex-row ">
            <ButtonLink
              href="https://drive.google.com/drive/folders/1f2gtx6cDE8Av829fkzyLWl3-AEDBZSWF?usp=sharing"
              color="white"
              className="mt-5 shadow-xl"
            >
              Previous Year Papers
            </ButtonLink>
            <ButtonLink
              href="https://drive.google.com/drive/folders/1M-nox11_GeNdacU_4xV8q6yyrOsxqvxY?usp=sharing"
              color="white"
              className="mt-5 shadow-xl"
            >
              SEE Papers Year wise
            </ButtonLink>
          </div>
          <p className="mt-10 text-lg tracking-tight text-white">
            <span className="font-bold drop-shadow-lg">Physics Cycle:</span>
          </p>
          <div className="flex flex-col justify-center gap-4 md:flex-row ">
            <ButtonLink
              href="https://drive.google.com/drive/folders/1cM8xMWFAUACsVdopjyrIxDuAiO6ux8Ml?usp=sharing"
              color="white"
              className="mt-5 shadow-xl"
            >
              Previous Year Papers
            </ButtonLink>
            <ButtonLink
              href="https://drive.google.com/drive/folders/1w6lR16CXz6fRYqc6ZxNHA3y4uYK7EKF-?usp=sharing"
              color="white"
              className="mt-5 shadow-xl"
            >
              SEE Papers Year wise
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
