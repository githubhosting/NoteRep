import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import React from 'react'

import { Header } from '@/components/Header'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

let newDate = new Date()
let todaydate = newDate.toISOString().slice(0, 10)
let currentmonth = newDate.getMonth() + 1

const datesarray = []
for (let i = 27; i <= 100; i++) {
  datesarray.push(
    new Date(newDate.getFullYear(), 2, i).toISOString().slice(0, 10)
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
    date: '2023-04-10',
    name: 'AEC',
  },
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
    name: 'Kan',
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
    <div className="p-0 lg:flex lg:h-full lg:flex-col lg:p-4">
      <p className="flex items-center justify-center lg:flex-none border-t pt-5">
        SEE Exam TimeTable
      </p>
      <div className="flex items-center justify-center py-3 px-6 lg:flex-none">
        <h1 className="bg-white py-1 px-3 text-lg font-semibold text-gray-900 dark:bg-white/30 dark:text-white rounded-md">
          <time>{newDate.toLocaleString('default', { month: 'long' })}</time>
        </h1>
      </div>
      <div className="bg-white dark:bg-slate-800 p-2 rounded-xl">
        <div className="lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 text-center text-xs font-semibold leading-6 text-gray-700 dark:bg-cost5 dark:text-white lg:flex-none">
            {weekarray.map((day) => (
              <div
                key={day.long}
                className="border py-2 dark:border-indigo-50"
                aria-hidden="true"
              >
                {day.short}
                <span key={day.long} className="sr-only sm:not-sr-only">
                  {day.long}
                </span>
              </div>
            ))}
          </div>
          <div className="flex bg-indigo-50 text-xs leading-6 text-gray-700 dark:bg-cost5 dark:text-zinc-50 lg:flex-auto">
            {/* Desktop view */}
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5">
              {days.map((day) => (
                <div
                  key={day.date}
                  className={classNames(
                    parseInt(day.date.slice(5, 7)) == currentmonth
                      ? 'bg-white dark:bg-slate-900'
                      : 'bg-white/50 dark:bg-slate-800',
                    'relative border py-2 px-3 dark:border-indigo-50'
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      todaydate == day.date
                        ? 'flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 font-semibold text-white'
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
                            <div className="truncate rounded-md bg-indigo-50 px-2 align-middle font-medium text-gray-900 group-hover:text-blue-700 dark:bg-white/30 dark:text-white">
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
            <div className="isolate grid w-full grid-cols-7 grid-rows-5 rounded-lg lg:hidden">
              {days.map((day) => (
                <div
                  key={day.date}
                  className={classNames(
                    parseInt(day.date.slice(5, 7)) == currentmonth
                      ? 'bg-white dark:bg-slate-900'
                      : 'bg-white/50 dark:bg-slate-800',
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
                    'flex h-16 flex-col items-center border py-2 px-3 align-middle hover:bg-gray-100 focus:z-10 dark:border-indigo-50'
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
                    <span className="px-1 font-semibold">
                      {day.events.map((event) => (
                        <span className="flex justify-center rounded-md bg-indigo-50 px-1 align-middle dark:bg-white/30 dark:text-white">
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
