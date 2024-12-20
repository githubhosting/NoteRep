import Image from 'next/image'

import { ButtonLink } from '@/components/Button2'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'
import { Calendar } from '@/components/Calendarjr'
import { Counter } from '@/components/Calendarjr'
import { Transition } from '@headlessui/react'
import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'

export function CallToAction() {
  const [showButton, setShowButton] = useState(false)

  const [isShowing, setIsShowing] = useState(false)
  const [enabled, setEnabled] = useState(false)

  const examDate = new Date('2021-12-17T00:00:00')
  const today = new Date()
  const diff = examDate.getTime() - today.getTime()
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  const [counter, setCounter] = useState(seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <section className="relative bg-indigo-50 dark:bg-gray-900">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <p className="border-t border-blue-900 pt-10 text-center text-3xl font-bold dark:border-white/70"></p>
          <div className="mx-auto max-w-7xl rounded-xl bg-blue-600 px-4 py-10 dark:bg-[#0761d1] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
              <div className="pb-6">
                <a
                  target="_blank"
                  href="https://drive.google.com/drive/folders/1FPZP22gKIv_A-bJbOZR-6jZtiK8hFbnp?usp=sharing"
                  className="grad_button px-4 py-2 font-semibold"
                >
                  MSRIT NOTES All Semester
                </a>
              </div>
              <div className="pb-6">
                <a
                  target="_blank"
                  href="https://drive.google.com/drive/folders/1FDy6mEK5kV3Jost-dsjdoZUoTHowq2om?usp=sharing"
                  className="grad_button px-4 py-2 font-semibold"
                >
                  All Previous Year Papers
                </a>
              </div>
              <ButtonLink
                href="https://gpaestimator.streamlit.app"
                color="white"
                className="mb-5 shadow-md"
                target="_blank"
              >
                Calculla GPA Estimator
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
      <Container>
        <div className="flex flex-row items-center justify-center gap-2 py-3 lg:p-5">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? 'bg-blue-600' : 'bg-white dark:bg-gray-500'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-gray-200 transition dark:bg-white`}
            />
          </Switch>
          <p className="text-xs font-semibold text-slate-900 dark:text-zinc-50">
            {enabled ? 'Hide' : 'Show Timetable'}
          </p>
        </div>
        <Transition
          show={enabled}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* <Counter /> */}
          <Calendar />
        </Transition>
      </Container>
    </section>
  )
}
