import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background.jpg'

const schedule = [
  {
    cycle: 'Physics Cycle',
    dateTime: 'I SEMESTER',
    summary: 'I SEMESTER',
    timeSlots: [
      {
        name: 'Advanced Calculus',
        description: 'MA11 | Mathematics',
        start: '9:00AM',
        end: '10:00AM',
        link: 'https://drive.google.com/drive/folders/1ocboxyZqKUF8PcoPQCNcN1qW6_98s8py',
      },
      {
        name: 'Communicative English',
        description: 'HS12 | Humanities',
        start: '10:00AM',
        end: '11:00AM',
        link: 'https://drive.google.com/drive/folders/1wZFskaydriaWIrOeHMSNutNtV-55fqFx?usp=sharing',
      },
      {
        name: 'Basic Electrical Engineering',
        description: 'EE13 | Electrical & Electronics',
        start: '11:00AM',
        end: '12:00PM',
        link: 'https://drive.google.com/drive/folders/1oetzNGC020UfqQ8hMeyIxFRcO2fdJhVZ?usp=sharing',
      },
      {
        name: 'Basics Of Civil Engineering & Mechanics',
        description: 'CV14 | Civil Engineering',
        start: '12:00AM',
        end: '1:00PM',
        link: 'https://drive.google.com/drive/folders/1hfv8E8kByN9KcDElYJI1ZWqPIZYZmavg',
      },
      {
        name: 'Design Thinking',
        description: 'AEC26',
        start: '1:00PM',
        end: '2:00PM',
        link: 'https://drive.google.com/drive/folders/1aPjpHh6apHApF2sW9U88KFEn28csTpUh?usp=sharing',
      },
      {
        name: 'Engineering Physics',
        description: 'PY15 | Physics',
        start: '2:00PM',
        end: '3:00PM',
        link: 'https://drive.google.com/drive/folders/1HfYqOlmGppRU_lFEqcJ1SwkDxiRfUxKN?usp=sharing',
      },
      {
        name: 'Computer Aided Engineering Drawing',
        description: 'MEL17 | Mechanical Engineering',
        start: '3:00PM',
        end: '4:00PM',
        link: 'https://drive.google.com/drive/folders/1n9pDB2weAQ2qyuPfwA_69XmtO5wbN9wd?usp=sharing',
      },
      {
        name: 'Engineering Physics Laboratory',
        description: 'PYL18 | Physics',
        start: '4:00PM',
        end: '5:00PM',
        link: 'https://drive.google.com/drive/folders/1Hd-LMODhxKe3Vogyl2tdBGLpj_sv79Ms?usp=sharing',
      },
    ],
  },
  {
    cycle: 'Chemistry Cycle',
    dateTime: 'I SEMESTER',
    summary: 'I SEMESTER',
    timeSlots: [
      {
        name: 'Multivariate Calculus & Differential Equations',
        description: 'MA21 | Mathematics',
        start: '9:00AM',
        end: '10:00AM',
        link: 'https://drive.google.com/drive/folders/1nDwJtyynb8V-N0afwfSuXWDCQK9MFyFt?usp=sharing',
      },
      {
        name: 'Fundamentals Of Mechanical Engineering',
        description: 'ME22 | Mechanical Engineering',
        start: '10:00AM',
        end: '11:00AM',
        link: 'https://drive.google.com/drive/folders/14UBANxwD6X3w7R4z_LbGxlx8bL7iizwW?usp=sharing',
      },
      {
        name: 'Basic Electronics',
        description: 'EC23 | EC/ET',
        start: '11:00AM',
        end: '12:00PM',
        link: 'https://drive.google.com/drive/folders/16hJtglzOMFIZgi1I4CmmWvNVTzfEa_lz?usp=sharing',
      },
      {
        name: 'Computing Fundamentals And C Programming',
        description: 'CS24 | CSE/ISE',
        start: '12:00PM',
        end: '1:00PM',
        link: 'https://drive.google.com/drive/folders/1qR61EoAEOu2kaTtDUoV7NQY3dGl326AP?usp=sharing',
      },
      {
        name: 'Engineering Chemistry',
        description: 'CY25 | Chemistry',
        start: '1:00PM',
        end: '2:00PM',
        link: 'https://drive.google.com/drive/folders/1PwOQv5aGNb7A-YBq9Jg3GEca_3D12IlJ?usp=sharing',
      },
      {
        name: 'A Scientific Approach To Health',
        description: 'AEC26',
        start: '2:00PM',
        end: '3:00PM',
        link: 'https://drive.google.com/drive/folders/1hhpslVlioi_ctjRHd9yBdFfFDteq0zFP?usp=sharing',
      },
      {
        name: 'Engineering Chemistry Laboratory',
        description: 'CYL27 | Chemistry',
        start: '3:00PM',
        end: '4:00PM',
        link: 'https://drive.google.com/drive/folders/1PhVaeiy233wPPst8t6kBf05YdyMfn9Cf?usp=sharing',
      },
      {
        name: 'C Programming Laboratory',
        description: 'CSL28 | CSE/ISE',
        start: '4:00PM',
        end: '5:00PM',
        link: 'https://drive.google.com/drive/folders/11hGw83CGCKOnAg_gvmEzzpxilcXVJYeB?usp=sharing',
      },
      {
        name: 'Workshop Practice',
        description: 'MEL29 | Mechanical Engineering',
        start: '5:00PM',
        end: '6:00PM',
        link: 'https://drive.google.com/drive/folders/1RSYS98m7xz8JcRRuxHubaZZvYLfuRNjE?usp=sharing',
      },
    ],
  },
]

function ScheduleTabbed() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let smMediaQuery = window.matchMedia('(min-width: 640px)')

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(smMediaQuery)
    smMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      smMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <Tab.Group
      as="div"
      id="Schedule"
      className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:hidden"
      vertical={tabOrientation === 'vertical'}
    >
      <Tab.List className="-mx-4 flex space-x-4 overflow-x-auto pl-4 pb-4 sm:mx-0 sm:block sm:space-y-10 sm:space-x-0 sm:pb-0 sm:pl-0 sm:pr-8">
        {({ selectedIndex }) =>
          schedule.map((day, dayIndex) => (
            <div
              key={day.dateTime}
              className={clsx(
                'relative w-3/4 flex-none pr-4 sm:w-auto sm:pr-0',
                {
                  'opacity-70': dayIndex !== selectedIndex,
                }
              )}
            >
              <DaySummary
                day={{
                  ...day,
                  date: (
                    <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                      <span className="absolute inset-0" />
                      {day.cycle}
                    </Tab>
                  ),
                }}
              />
            </div>
          ))
        }
      </Tab.List>
      <Tab.Panels>
        {schedule.map((day) => (
          <Tab.Panel
            key={day.dateTime}
            className="[&:not(:focus-visible)]:focus:outline-none"
          >
            <TimeSlots day={day} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

function DaySummary({ day }) {
  return (
    <>
      <h3 className="text-center text-2xl font-semibold tracking-tight text-blue-900 dark:text-white">
        {day.cycle}
      </h3>
      <p className="mt-1.5 text-center text-base tracking-tight text-blue-900 dark:text-white">
        {day.summary}
      </p>
    </>
  )
}

function TimeSlots({ day, className }) {
  return (
    <div
      // className="bg-slate-50 pt-px sm:rounded-5xl"
      className={clsx(
        className,
        'space-y-8 rounded-4xl bg-white/60 py-14 px-10 pt-px text-center shadow-xl shadow-blue-900/5 backdrop-blur dark:bg-black/30'
      )}
    >
      {day.timeSlots.map((timeSlot, timeSlotIndex) => (
        <div key={timeSlot.start}>
          {timeSlotIndex >= 0 && (
            <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10" />
          )}
          <h4 className="text-lg font-semibold tracking-tight text-blue-900 dark:text-indigo-50">
            {timeSlot.name}
          </h4>
          {timeSlot.description && (
            <>
              <p className="mt-1 tracking-tight text-blue-900 dark:text-blue-200">
                {timeSlot.description}
              </p>
            </>
          )}
          <button className="mt-4 rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold tracking-tight text-white shadow-lg shadow-blue-900/50 hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2 dark:bg-sky-500">
            <a href={timeSlot.link}>View</a>
          </button>
        </div>
      ))}
    </div>
  )
}

export function Schedule() {
  return (
    <section
      id="schedule"
      aria-labelledby="schedule-title"
      className="scroll-pl-6 py-20 sm:py-28"
    >
      <div className="relative mt-7 sm:mt-12">
        <div className="absolute -inset-x-0 -top-40 -bottom-32 overflow-hidden bg-indigo-50 dark:bg-cost5">
          <div className="absolute left-full top-0 translate-y-[0%] -translate-x-[50%] sm:left-1/2 sm:-translate-y-[15%] sm:-translate-x-[20%] md:translate-x-[0%] lg:translate-x-[5%] lg:translate-y-[4%] xl:-translate-y-[8%] xl:translate-x-[27%]">
            <Image
              src={backgroundImage}
              alt=""
              layout="fixed"
              width={918}
              height={1495}
              unoptimized
              className="opacity-70 dark:opacity-0"
            />
          </div>
        </div>
        <Container className="relative">
          <ScheduleTabbed />
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-8">
            {schedule.map((day) => (
              <section key={day.dateTime}>
                <DaySummary day={day} />
                <TimeSlots day={day} className="mt-10" />
              </section>
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
