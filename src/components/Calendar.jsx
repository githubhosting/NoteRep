import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import React from 'react'

import { Header } from '@/components/Header'
import { Fragment } from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

let newDate = new Date()
let todaydate = newDate.toISOString().slice(0, 10)
let currentmonth = newDate.getMonth() + 1

const datesarray = []
for (let i = 25; i <= 100; i++) {
  datesarray.push(
    new Date(newDate.getFullYear(), 2, i).toISOString().slice(0, 10)
  )
}

const exam = [
  {
    date: '2023-04-12',
    name: 'Maths',
    href: '#',
  },
  {
    date: '2023-04-15',
    name: 'UHV',
  },
  {
    date: '2023-04-17',
    name: 'DBMS',
  },
  {
    date: '2023-04-19',
    name: 'DS',
  },
  {
    date: '2023-04-21',
    name: 'COA',
  },
  {
    date: '2023-04-24',
    name: 'DMS',
  },
  {
    date: '2023-04-26',
    name: 'Kannada',
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

export function Calendar() {
  return (
    <div className="p-4 lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          <time>{newDate.toLocaleString('default', { month: 'long' })}</time>
        </h1>
      </header>
      <div className="shadow-lg ring-1 ring-black ring-opacity-5 dark:shadow-num_d lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-indigo-50 text-xs leading-6 text-gray-700 dark:bg-cost5 lg:flex-auto">
          {/* Desktop view */}
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px">
            {days.map((day) => (
              <div
                key={day.date}
                className={classNames(
                  parseInt(day.date.slice(5, 7)) == currentmonth
                    ? 'bg-white'
                    : 'bg-gray-50 text-gray-500',
                  'relative py-2 px-3'
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    todaydate == day.date
                      ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                      : undefined
                  }
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
                {day.events.length > 0 && (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map((event) => (
                      <li key={event.id}>
                        <a href={event.href} className="group flex">
                          <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                            {event.name}
                          </p>
                          <time
                            dateTime={event.datetime}
                            className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                          >
                            {event.time}
                          </time>
                        </a>
                      </li>
                    ))}
                    {day.events.length > 2 && (
                      <li className="text-gray-500">
                        + {day.events.length - 2} more
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
          {/* Mobile view */}
          <div className="isolate grid w-full grid-cols-7 grid-rows-5 gap-px bg-indigo-50 dark:bg-cost5 lg:hidden">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  parseInt(day.date.slice(5, 7)) == currentmonth
                    ? 'bg-white'
                    : 'bg-indigo-50',
                  (day.isSelected || todaydate == day.date) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected && todaydate == day.date && 'text-green-600',
                  !day.isSelected &&
                    parseInt(day.date.slice(5, 7)) == currentmonth &&
                    !todaydate == day.date &&
                    'text-gray-900',
                  !day.isSelected &&
                    !parseInt(day.date.slice(5, 7)) == currentmonth &&
                    !todaydate == day.date &&
                    'text-gray-500',
                  'flex h-14 flex-col items-center py-2 px-3 align-middle hover:bg-gray-100 focus:z-10 border rounded-sm'
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected &&
                      'flex h-6 w-6 items-center justify-center rounded-full',
                    day.isSelected && todaydate == day.date && 'bg-green-600',
                    day.isSelected && !todaydate == day.date && 'bg-gray-900'
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto">
                    {day.events.map((event) => (
                      <span
                        key={event.id}
                        // className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                      >
                        <span className="flex justify-center align-middle">
                          {event.name}
                        </span>
                      </span>
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {selectedDay?.events.length > 0 && (
        <div className="py-10 px-4 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {selectedDay.events.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.name}</p>
                  <time
                    dateTime={event.datetime}
                    className="mt-2 flex items-center text-gray-700"
                  >
                    <ClockIcon
                      className="mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
