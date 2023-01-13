import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import React from 'react'

import { Header } from '@/components/Header'
const subjects = [
  {
    Day: 'Monday',
    subject: ['Math lab', 'Math lab', 'Phy', '-', '-', '-', '-', '-'],
  },
  {
    Day: 'Tuesday',
    subject: [
      'English',
      'AEC (Health)',
      'C lab',
      'C lab',
      '-',
      'Math',
      'PLC14*',
      'ESC13*',
    ],
  },
  {
    Day: 'Wednesday',
    subject: [
      'Phy (t)',
      'Phy (t)',
      'Math (t)',
      'Math (t)',
      'English',
      '-',
      '-',
      '-',
    ],
  },
  {
    Day: 'Thursday',
    subject: ['Math', 'Phy', 'C theory', '-', 'Kannada', '-', '-', '-'],
  },
  {
    Day: 'Friday',
    subject: ['C lab', 'Phy', 'Math', '-', 'Math', 'PLC14*', 'ESC13*', '-'],
  },
  {
    Day: 'Saturday',
    subject: ['ESC13*', 'ESC13*', 'PLC14*', 'PLC14*', '-', '-', '-', '-'],
  },
]
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

function get_time() {
  console.log('time: ', time)
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

console.log(get_time())

export function Timetable1styear() {
  let newDate = new Date()
  let day_1 = newDate.getDay()

  return (
    <>
      <section class="body-font py-10 text-gray-600">
        <div class="mb-6 text-center">
          <h1 class="title-font mb-2 text-center text-2xl font-semibold text-gray-900 sm:text-3xl">
            Time Table for 1st Year CSE (AI & ML)
          </h1>
        </div>
        <div class="flex flex-col lg:overflow-x-hidden ">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="ml-2 min-w-full border-2">
                  <thead class="border-b-2 border-t-2 ">
                    <tr>
                      <th
                        scope="col"
                        class="border-r px-4 py-4 text-left text-sm font-bold text-gray-900"
                      >
                        Time/Days
                      </th>
                      {time_class.map((t, i) => (
                        <th
                          key={i}
                          scope="col"
                          class="whitespace-nowrap border-r px-4 py-4 text-left text-sm font-bold text-gray-900"
                        >
                          {get_time() === i ? (
                            <span class="rounded-md bg-green-200 px-2 py-1 text-sm font-semibold text-gray-900">
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
                      <tr class="border-b-2 bg-white">
                        <td class="whitespace-nowrap border-r px-4 py-4 text-sm font-semibold text-gray-900">
                          {subject.Day === day ? (
                            <span
                              key={j}
                              class="rounded-md bg-green-300 px-2 py-1 text-sm font-semibold text-gray-900"
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
                            class="whitespace-nowrap border-r px-4 py-4 text-sm font-medium text-gray-900"
                          >
                            {j === day_1 - 1 ? (
                              <span>
                                {i === get_time() ? (
                                  <span class="rounded-md border-2 border-red-400 bg-green-200 px-2 py-1 text-sm font-bold text-black">
                                    {sub}
                                  </span>
                                ) : (
                                  <span class="rounded-md bg-green-200 px-2 py-1 text-sm font-semibold text-gray-900">
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
    </>
  )
}
