import Image from 'next/image'

import { ButtonLink } from '@/components/Button2'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function CallToAction() {
  return (
    <section className="relative bg-indigo-50 dark:bg-gray-900">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <p className="border-t border-blue-900 pt-10 text-center text-3xl font-bold dark:border-white/70"></p>
          <div className="mx-auto max-w-7xl rounded-xl bg-blue-600 px-4 py-10 dark:bg-[#0761d1] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
              <div className="pb-10">
                <a
                  // href="https://gpaestimator.streamlit.app/"
                  // target="_blank"
                  href="/calculla"
                  className="grad_button border border-blue-600 py-2 px-4 font-semibold drop-shadow-lg"
                >
                  Calculla - GPA Estimator
                </a>
              </div>
              <ButtonLink
                href="https://githubhosting.github.io/eventcalender/"
                color="white"
                className="mb-5 shadow-md"
                target="_blank"
              >
                Events Calendar
              </ButtonLink>
              <div className="my-1 border-t text-lg tracking-tight text-white">
                <p className="mt-5 font-bold drop-shadow-lg">
                  Chemistry Cycle:
                </p>
              </div>
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
          </div>
          <p className="border-b border-blue-900 pb-10 text-center text-3xl font-bold dark:border-white/70"></p>
        </div>
      </div>
    </section>
  )
}
