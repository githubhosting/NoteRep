import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background.jpg'

const schedule = [
  {
    date: 'Chemistry Cycle',
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
  {
    date: 'Physics Cycle',
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
        name: 'A Scientific Approach To Health',
        description: 'AEC26',
        start: '1:00PM',
        end: '2:00PM',
      },
      {
        name: 'Engineering Physics',
        description: 'PY15 | Physics',
        start: '2:00PM',
        end: '3:00PM',
      },
      {
        name: 'Computer Aided Engineering Drawing',
        description: 'MEL17 | Mechanical Engineering',
        start: '3:00PM',
        end: '4:00PM',
      },
      {
        name: 'Engineering Physics Laboratory',
        description: 'PYL18 | Physics',
        start: '4:00PM',
        end: '5:00PM',
      },
    ],
  },
  // {
  //   date: 'April 6',
  //   dateTime: '2022-04-06',
  //   summary:
  //     'We close out the event previewing new techniques that are still in development.',
  //   timeSlots: [
  //     {
  //       name: 'Andrew Greene',
  //       description: 'Neuralink dark patterns',
  //       start: '9:00AM',
  //       end: '10:00AM',
  //     },
  //     {
  //       name: 'Heather Terry',
  //       description: 'DALL-E for passports',
  //       start: '10:00AM',
  //       end: '11:00AM',
  //     },
  //     {
  //       name: 'Piers Wilkins',
  //       description: 'Quantum password cracking',
  //       start: '11:00AM',
  //       end: '12:00PM',
  //     },
  //     {
  //       name: 'Lunch',
  //       description: null,
  //       start: '12:00PM',
  //       end: '1:00PM',
  //     },
  //     {
  //       name: 'Gordon Sanderson',
  //       description: 'SkyNet is coming',
  //       start: '1:00PM',
  //       end: '2:00PM',
  //     },
  //     {
  //       name: 'Kimberly Parsons',
  //       description: 'Dark patterns for the metaverse',
  //       start: '2:00PM',
  //       end: '3:00PM',
  //     },
  //     {
  //       name: 'Richard Astley',
  //       description: 'Knowing the game and playing it',
  //       start: '3:00PM',
  //       end: '4:00PM',
  //     },
  //   ],
  // },
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
                      {day.date}
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
      <h3 className="text-2xl font-semibold tracking-tight text-blue-900">
        <time dateTime={day.dateTime}>{day.date}</time>
      </h3>
      <p className="mt-1.5 text-base tracking-tight text-blue-900">
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
        'space-y-8 rounded-4xl bg-white/60 py-14 px-10 pt-px text-center shadow-xl shadow-blue-900/5 backdrop-blur'
      )}
    >
      {day.timeSlots.map((timeSlot, timeSlotIndex) => (
        <div key={timeSlot.start}>
          {timeSlotIndex >= 0 && (
            <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10" />
          )}
          <h4 className="text-lg font-semibold tracking-tight text-blue-900">
            {timeSlot.name}
          </h4>
          {timeSlot.description && (
            <>
              <p className="sr-only">talking about</p>
              <p className="mt-1 tracking-tight text-blue-900">
                {timeSlot.description}
              </p>
            </>
          )}
          <p className="sr-only">at</p>
          {/* <p className="mt-1 font-mono text-sm text-slate-500">
            <time dateTime={`${day.dateTime}T${timeSlot.start}-08:00`}>
              {timeSlot.start}
            </time>{' '}
            -{' '}
            <time dateTime={`${day.dateTime}T${timeSlot.end}-08:00`}>
              {timeSlot.end}
            </time>{' '}
            PST
          </p> */}
          <button className="mt-4 rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold tracking-tight text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2">
            <a href={timeSlot.link}>View</a>
          </button>
        </div>
      ))}
    </div>
  )
}

function ScheduleStatic() {
  return (
    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-8">
      {schedule.map((day) => (
        <section key={day.dateTime}>
          <DaySummary day={day} />
          <TimeSlots day={day} className="mt-10" />
        </section>
      ))}
    </div>
  )
}

export function Schedule() {
  return (
    <section
      id="schedule"
      aria-labelledby="schedule-title"
      className="py-20 sm:py-32"
    >
      <h2 id="schedule-title" className="sr-only">
        Drive Links
      </h2>
      {/* <Container className="relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl lg:pr-24">
          <p className="font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl">
            Our three day schedule is jam-packed with brilliant, creative, evil
            geniuses.
          </p>
          <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
            The worst people in our industry giving the best talks you’ve ever
            seen. Nothing will be recorded and every attendee has to sign an NDA
            to watch the talks.
          </p>
        </div>
      </Container> */}
      <div className="relative mt-14 sm:mt-24">
        <div className="absolute -inset-x-0 -top-40 -bottom-32 overflow-hidden bg-indigo-50">
          <div className="absolute left-full top-0 translate-y-[0%] -translate-x-[50%] sm:left-1/2 sm:-translate-y-[15%] sm:-translate-x-[20%] md:translate-x-[0%] lg:translate-x-[5%] lg:translate-y-[4%] xl:-translate-y-[8%] xl:translate-x-[27%]">
            <Image
              src={backgroundImage}
              alt=""
              layout="fixed"
              width={918}
              height={1495}
              unoptimized
            />
          </div>
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
        </div>
        <Container className="relative">
          <ScheduleTabbed />
          <ScheduleStatic />
        </Container>
      </div>
    </section>
  )
}
