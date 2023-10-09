import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import React from 'react'

const subjects = [
  {
    Day: 'Monday',
    subject: [
      'Automata Tut',
      'Automata Tut',
      'Big Data',
      'Automata',
      '-',
      'Software',
      'Research Method',
      'ML *',
    ],
  },
  {
    Day: 'Tuesday',
    subject: [
      'Math Tut',
      'Math Tut',
      'AI',
      'DCN',
      '-',
      'DCN *',
      'DAA *',
      'AI *',
    ],
  },
  {
    Day: 'Wednesday',
    subject: ['AI', 'AI', 'DAA', 'Math', '-', 'Algo Lab', 'Algo Lab', 'Yoga'],
  },
  {
    Day: 'Thursday',
    subject: [
      'OS',
      'DAA',
      'ES/Web Lab',
      'ES/Web Lab',
      '-',
      'Math',
      'OS *',
      ' * ',
    ],
  },
  {
    Day: 'Friday',
    subject: ['DCN', 'OS', 'DCN Lab', 'DCN Lab', '-', 'AEC', ' * ', 'Yoga'],
  },
  {
    Day: 'Saturday',
    subject: ['Web Lab *', 'ES Lab *', '-', '-', '-', '-', '-', '-'],
  },
]
// const time_class = [
//   '9:00 - 9:55 AM',
//   '9:55 - 10:50 AM',
//   '11:05 - 12:00 PM',
//   '12:00 - 12:55 PM',
//   '12:55 - 1:45 PM',
//   '1:45 - 2:40 PM',
//   '2:40 - 3:35 PM',
//   '3:35 - 4:30 PM',
// ]
const time_class = [
  '9:00 - 9:55',
  '9:55 - 10:50',
  '11:05 - 12:00',
  '12:00 - 12:55',
  '12:55 - 1:45',
  '1:45 - 2:40',
  '2:40 - 3:35',
  '3:35 - 4:30',
]

let newDate = new Date()
let day = newDate.toLocaleString('default', { weekday: 'long' })
let time = newDate.toLocaleString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
})
setInterval(() => {
  newDate = new Date()
  day = newDate.toLocaleString('default', { weekday: 'long' })
  time = newDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
}, 60000)

function get_time() {
  // console.log('time: ', time)
  if (time >= '09:00' && time <= '09:55') {
    return 0
  } else if (time >= '09:55' && time <= '10:50') {
    return 1
  } else if (time >= '11:05' && time <= '12:00') {
    return 2
  } else if (time >= '12:00' && time <= '12:55') {
    return 3
  } else if (time >= '12:55' && time <= '13:45') {
    return 4
  } else if (time >= '13:45' && time <= '14:40') {
    return 5
  } else if (time >= '14:40' && time <= '15:35') {
    return 6
  } else if (time >= '15:35' && time <= '16:30') {
    return 7
  } else {
    return null
  }
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Timetable() {
  let newDate = new Date()
  let day_1 = newDate.getDay()
  return (
    <section className="body-font mx-auto max-w-7xl px-4 py-2 text-gray-600 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h1 className="title-font mb-2 text-center text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl">
          Time Table
        </h1>
      </div>
      <div className="flex flex-col py-1 md:px-10 lg:overflow-x-hidden">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg border-2 dark:shadow-num_d1">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-centre border-r px-4 py-4 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      Days/Time
                    </th>
                    {time_class.map((t, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="text-centre whitespace-nowrap border-r px-4 py-4 text-sm font-bold text-gray-900 dark:text-white"
                      >
                        {get_time() === i ? (
                          <span className="rounded-md bg-green-200 px-2 py-1 text-sm font-semibold text-gray-900 dark:text-gray-800">
                            {time_class[i]}
                          </span>
                        ) : (
                          <span>{t}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, j) => (
                    <tr className="border-t bg-white dark:border-gray-200 dark:bg-slate-900 dark:text-white">
                      <td className="whitespace-nowrap border-r px-4 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                        {subject.Day === day ? (
                          <span
                            key={j}
                            className="rounded-md bg-green-300 px-2 py-1 text-sm font-semibold text-gray-900"
                          >
                            {subject.Day}
                          </span>
                        ) : (
                          <span className="px-2 py-1">{subject.Day}</span>
                        )}
                      </td>
                      {subject.subject.map((sub, i) => (
                        <td
                          key={i}
                          className={classNames(
                            i <= 6 && 'border-r',
                            'whitespace-nowrap border-0 px-4 py-4 text-center text-sm font-medium text-gray-900 dark:text-white'
                          )}
                        >
                          {j === day_1 - 1 ? (
                            <span>
                              {i === get_time() ? (
                                <span className="rounded-md border-2 border-green-500 bg-green-200 px-2 py-1 text-sm font-bold text-black dark:text-gray-900">
                                  {sub}
                                </span>
                              ) : (
                                <span className="rounded-md bg-green-200 px-2 py-1 text-sm font-semibold text-gray-900 ">
                                  {sub}
                                </span>
                              )}
                            </span>
                          ) : (
                            <span>{sub}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
