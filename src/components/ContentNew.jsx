import { useId } from 'react'
import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/Container'
import { ButtonLink } from '@/components/Button'

export function ContentNew(props) {
  const drive = props.drive
  return (
    <section>
      <Container>
        <div className="mx-auto max-w-5xl sm:text-center">
          <div className="flex flex-col items-center justify-center gap-3 pt-5 md:flex-row">
            {/* <ButtonLink
              href="/syllabus"
              className="mt-5 w-auto rounded-lg py-2 hover:bg-blue-900"
            >
              Updated Syllabus
            </ButtonLink> */}
            {/* <ButtonLink href="#" className="mt-5 w-auto rounded-lg py-2">
              Previous Year Papers
            </ButtonLink> */}
          </div>
          <div className="mt-10 flex items-center justify-center">
            <ButtonLink
              href="/syllabus"
              className="hover:shadowpress rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-2"
            >
              CSE (AI & ML) Curriculum
            </ButtonLink>
          </div>
          {/* <div className="flex justify-center">
            <ButtonLink
              target="_blank"
              href="https://docs.google.com/document/d/e/2PACX-1vR8wk2gz-Cnjhn8bQo5afLgVTQO9ZT-uptfjdhASSmwn74kmCm6ETrQrYCpC-jCFUwhf2EKNsW8v2vA/pub"
              className="hover:shadowpress mt-6 w-auto rounded-lg bg-blue-50 py-2 shadow-lg dark:text-white dark:hover:text-blue-200"
            >
              Syllabus for {props.sem} Sem
            </ButtonLink>
          </div> */}
        </div>
        <ul
          role="list"
          className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3 lg:items-center"
        >
          {drive.map((item, index) => (
            <li
              key={index}
              className="rounded-xl bg-gradient-to-r from-green-300 via-blue-300 to-purple-600 p-0.5 shadow-lg transition hover:shadow-sm dark:shadow-5xl"
            >
              <div className="rounded-[10px] bg-white p-5 dark:bg-slate-900 sm:p-6">
                <h3 className="text-center text-base font-semibold uppercase text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-center text-base text-gray-700 dark:text-slate-400">
                  {item.description}
                </p>
                <div className="flex justify-center gap-3">
                  <a href={item.link} target="_blank">
                    <button className="mt-2 rounded-lg border bg-transparent px-4 py-2 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-900 hover:text-white dark:border-gray-500 dark:text-slate-100 dark:shadow-num_d0 hover:dark:text-white">
                      View
                    </button>
                  </a>
                  <a href={item.otherlink} target="_blank">
                    <button className="mt-2 rounded-lg border bg-transparent px-4 py-2 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-900 hover:text-white dark:border-gray-500 dark:text-slate-100 dark:shadow-num_d0">
                      Other links
                    </button>
                  </a>
                </div>
                {item.tag && (
                  <div className="mt-4 flex flex-wrap justify-center gap-1">
                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-900 dark:text-indigo-50">
                      {item.tag}
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
