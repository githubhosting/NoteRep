import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import React from 'react'

import { Header } from '@/components/Header'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { data } from 'autoprefixer'

let newDate = new Date()
let todaydate = newDate.toISOString().slice(0, 10)
// let todaydate = '2024-02-01'
let currentmonth = newDate.getMonth() + 1

const datesarray = []
for (let i = 29; i <= 100; i++) {
  datesarray.push(
    new Date(newDate.getFullYear(), 0, i).toISOString().slice(0, 10)
  )
}

const weekarray = [
  { short: 'S', long: 'un' },
  { short: 'M', long: 'on' },
  { short: 'T', long: 'ue' },
  { short: 'W', long: 'ed' },
  { short: 'T', long: 'hu' },
  { short: 'F', long: 'ri' },
  { short: 'S', long: 'at' },
]

const exam = [
  {
    date: '2024-02-06',
    name: 'SE/CN/IPR',
  },
  {
    date: '2024-02-08',
    name: 'AI',
  },
  {
    date: '2024-02-13',
    name: 'DBMS',
  },
  {
    date: '2024-02-15',
    name: 'OS',
  },
  {
    date: '2024-02-17',
    name: 'CG/CNS/DM',
  },
  {
    date: '2024-02-19',
    name: 'EVS',
  },
  {
    date: '2024-02-21',
    name: 'IPR',
  },
  {
    date: '2024-02-23',
    name: 'AEC',
  },
]

const days = []
for (let i = 0; i < 35; i++) {
  days.push({
    date: datesarray[i],
    events: exam.filter((event) => event.date === datesarray[i]),
  })
}

const selectedDay = days.find((day) => day.isSelected)

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export function Counter() {
  const next_exam = exam.filter((event) => event.date > todaydate)
  const next_exam_date = next_exam[0].date
  const next_exam_name = next_exam[0].name
  const next_exam_date_time = next_exam_date + 'T09:30:00'
  const examdate = new Date(next_exam_date_time)
  const today = new Date()
  const diffTime = examdate - today
  const diff = examdate.getTime() - today.getTime()
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  const diffSeconds = Math.ceil(diffTime / 1000)
  const days_ = Math.floor(diffSeconds / 86400)
  const hours_ = Math.floor((diffSeconds % 86400) / 3600)
  const minutes_ = Math.floor(((diffSeconds % 86400) % 3600) / 60)
  const seconds_ = Math.floor(((diffSeconds % 86400) % 3600) % 60)

  const [counter, setCounter] = useState(seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter - 1)
    }, 1000 * 60 * 60 * 24)
    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <p className="flex items-center justify-center pt-5 text-slate-900 dark:text-zinc-50 lg:flex-none">
        Next Exam: {next_exam_name}
      </p>
      <div className="grid auto-cols-max grid-flow-col justify-center gap-3 py-5 text-center lg:gap-6">
        <div className="rounded-box flex flex-col bg-white p-3 text-slate-900 dark:bg-neutral dark:text-zinc-50">
          <span className="countdown font-mono text-4xl lg:text-5xl">
            <span style={{ '--value': days_ }}></span>
          </span>
          days
        </div>
        <div className="rounded-box flex flex-col bg-white p-3 text-slate-900 dark:bg-neutral dark:text-zinc-50">
          <span className="countdown font-mono text-4xl lg:text-5xl">
            <span style={{ '--value': hours_ }}></span>
          </span>
          hours
        </div>
        <div className="rounded-box flex flex-col bg-white p-3 text-slate-900 dark:bg-neutral dark:text-zinc-50">
          <span className="countdown font-mono text-4xl lg:text-5xl">
            <span style={{ '--value': minutes_ }}></span>
          </span>
          min
        </div>
        <div className="rounded-box flex flex-col bg-white p-3 text-slate-900 dark:bg-neutral dark:text-zinc-50">
          <span className="countdown font-mono text-4xl lg:text-5xl">
            <span style={{ '--value': seconds_ }}></span>
          </span>
          sec
        </div>
      </div>
    </div>
  )
}

export function Calendar() {
  return (
    <div className="border-t p-0 lg:flex lg:h-full lg:flex-col lg:p-4 ">
      <p className="flex items-center justify-center pt-5 text-slate-900 dark:text-zinc-50 lg:flex-none">
        Calendar
      </p>
      <div className="flex items-center justify-center px-6 py-4 lg:flex-none">
        <h1 className="rounded-md bg-white px-3 text-lg font-semibold text-gray-900 dark:bg-[#0071f0] dark:text-white">
          <time>{newDate.toLocaleString('default', { month: 'long' })}</time>
        </h1>
      </div>
      <div className="rounded-xl border bg-white p-2 shadow-xl dark:border-gray-500 dark:bg-gray-900 dark:shadow-num_d1 lg:p-3">
        <div className="lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 text-center text-xs font-semibold leading-6 text-gray-700 dark:text-white lg:flex-none lg:rounded-t-lg">
            {weekarray.map((day) => (
              <div key={day.long} className="py-2" aria-hidden="true">
                {day.short}
                <span key={day.long} className="sr-only sm:not-sr-only">
                  {day.long}
                </span>
              </div>
            ))}
          </div>
          <div className="flex text-xs leading-6 text-gray-700 dark:text-zinc-50 lg:flex-auto">
            {/* Desktop view */}
            <div className="isolate hidden w-full gap-px rounded-lg bg-gray-200 shadow ring-1 ring-gray-200 dark:bg-slate-600 dark:bg-white/40 dark:ring-gray-500 lg:grid lg:grid-cols-7 lg:grid-rows-5">
              {days.map((day, dayIdx) => (
                <div
                  key={day.date}
                  className={classNames(
                    parseInt(day.date.slice(5, 7)) == currentmonth
                      ? 'bg-white dark:bg-slate-900'
                      : 'bg-white/90 dark:bg-slate-800',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg',
                    'px-3 py-2'
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      todaydate == day.date
                        ? 'flex h-6 w-6 items-center justify-center rounded-md bg-green-800 font-semibold text-white'
                        : undefined,
                      'px-1 text-sm font-medium'
                    )}
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>
                  {day.events.length > 0 && (
                    <ol className="mt-2">
                      {day.events.map((event) => (
                        <li>
                          <a href={event.href} className="group flex">
                            <div className="truncate rounded-md bg-indigo-50 px-2 align-middle font-medium text-gray-900 dark:bg-[#0071f0] dark:text-white">
                              <p className="text-sh">{event.name}</p>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              ))}
            </div>
            {/* Mobile view */}
            <div className="ring-grey-200 isolate grid w-full grid-cols-7 grid-rows-5 gap-px rounded-lg bg-slate-300 ring-1 dark:ring-gray-500 lg:hidden">
              {days.map((day, dayIdx) => (
                <div
                  key={day.date}
                  className={classNames(
                    parseInt(day.date.slice(5, 7)) == currentmonth
                      ? 'bg-white dark:bg-slate-900'
                      : 'bg-white/90 dark:bg-slate-800',
                    (day.isSelected || todaydate == day.date) &&
                      'font-semibold',
                    day.isSelected && 'text-white',
                    !day.isSelected &&
                      todaydate == day.date &&
                      'font-bold text-blue-500',
                    !day.isSelected &&
                      parseInt(day.date.slice(5, 7)) == currentmonth &&
                      !todaydate == day.date &&
                      'text-gray-900 dark:text-white',
                    !day.isSelected &&
                      !parseInt(day.date.slice(5, 7)) == currentmonth &&
                      !todaydate == day.date &&
                      'text-gray-500 dark:text-gray-400',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg',
                    'flex h-16 flex-col items-center px-3 py-2 align-middle hover:bg-gray-100 focus:z-10'
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      todaydate == day.date &&
                        'flex h-6 w-6 items-center justify-center rounded-md bg-green-400 font-semibold text-white dark:bg-green-700'
                    )}
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>
                  {day.events.length > 0 && (
                    <span className="px-1 font-semibold">
                      {day.events.map((event) => (
                        <span className="flex justify-center rounded-md bg-indigo-50 px-1 align-middle dark:bg-[#0071f0] dark:text-white">
                          {event.name}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
