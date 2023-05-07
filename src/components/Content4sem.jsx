import { useId } from 'react'
import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/Container'
import { ButtonLink } from '@/components/Button'

const cseaimlstatic = [
  {
    title: 'Numerical Techniques and Probability',
    description: '(2:1:0) CI41',
    link: 'https://drive.google.com/drive/folders/1d126yrfEwfL1QqEL9cJcl3SHP6skil0G?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Data Communication and Networking',
    description: '(2:0:1) CI42',
    link: 'https://drive.google.com/drive/folders/1Jp1yODvx1-EO5SywKVLxsVdsqLYAf_d7?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Design and Analysis of Algorithms',
    description: '(2:1:0) CI43',
    link: 'https://drive.google.com/drive/folders/1xKwDfh47KlX5yOFw_zPK7gHJwnd64gIC?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Intro to AI',
    description: '(3:0:0) CI44',
    link: 'https://drive.google.com/drive/folders/1sGeLN9AV2mPm3CxNCz8Ws9u0nwHNY33k?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Operating System',
    description: '(3:0:0) CI45',
    link: 'https://drive.google.com/drive/folders/1UjfYJyCRSz8KtQeWxnypGEz9q1uIBbSs?usp=share_link',
    otherlink: '/links',
    // tag: 'Maths',
  },
  {
    title: 'Embedded Systems Lab',
    description: '(0:0:1) CIL46',
    link: 'https://github.com/githubhosting/DS_Lab_c-programming_Personal',
    otherlink: 'https://github.com/githubhosting/DS_Lab_c-programming',
    extra: 'This is github repository',
    tag: '',
  },
  {
    title: 'Algorithms Lab',
    description: '(0:0:1) CIL47',
    link: 'https://github.com/githubhosting/OOPS_Lab_CPP',
    otherlink: '/links',
    extra: 'This is github repository',
    tag: '',
  },
  {
    title: 'Constitution and Ethics',
    description: '(1:0:0) HS492',
    link: 'https://drive.google.com/drive/folders/1i6_X176UpyXi_aufwXyWcLiHVgpD6yEz?usp=sharingl̥',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Web Technologies Lab',
    description: '(0:0:1) HS492',
    link: 'https://drive.google.com/drive/folders/1MIXAORMZ0GYUFJqYDjsYZbKYEnv8Rgch?usp=share_link',
    otherlink: '/links',
    extra: 'This is github repository',
    tag: '',
  },
  {
    title: 'Ability Enhancement Course-IV',
    description: '(1:0:0) AEC410',
    link: '#',
    otherlink: '/links',
    tag: '',
  },
]

export function Content() {
  return (
    <section>
      <Container>
        <div className="mx-auto max-w-5xl sm:text-center">
          <div className="flex flex-col items-center justify-center gap-3 pt-5 md:flex-row">
            <ButtonLink
              href="/syllabus"
              className="mt-5 w-full rounded-lg py-2 hover:bg-blue-900"
            >
              Curriculum Book
            </ButtonLink>
            <ButtonLink
              href="https://drive.google.com/drive/folders/10KCeAYroDNMJ4rLRbJWVaWdgiz84M2vh?usp=sharing"
              className="mt-5 w-full rounded-lg py-2"
            >
              Previous Year Papers
            </ButtonLink>
            {/* <ButtonLink href="/syllabus_cy" className="mt-5 w-full rounded-lg">
              CY Curriculum
            </ButtonLink> */}
          </div>
          {/* <div className="mt-10 flex items-center justify-center gap-3">
            <ButtonLink
              href="/syllabus"
              className="hover:shadowpress rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-3"
            >
              CSE (AI & ML) Curriculum
            </ButtonLink>
            <ButtonLink
              href="/syllabus_cy"
              className="hover:shadowpress rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-3"
            >
              CSE (Cyber Security) Curriculum
            </ButtonLink>
          </div> */}
          {/* <ButtonLink
            href="https://docs.google.com/document/d/1fnkwCDB2RibjQ_MLFaT9gGOLNHnomGOkXjTeVz-6ym8/edit?usp=sharing"
            className="hover:shadowpress mt-6 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-3 shadow-lg"
          >
            CIE 2 Portions (Tentative)
          </ButtonLink> */}
        </div>
        <ul
          role="list"
          className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3 lg:items-center"
        >
          {cseaimlstatic.map((item) => (
            <li className="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-lg transition hover:shadow-sm dark:shadow-5xl">
              <div className="rounded-[10px] bg-white p-5 dark:bg-slate-800 sm:p-6">
                <h3 className="text-center text-base font-semibold uppercase text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-center text-base text-gray-700 dark:text-slate-400">
                  {item.description}
                </p>
                <div className="flex justify-center gap-3">
                  <a href={item.link} target="_blank">
                    <button className="mt-2 rounded-lg border bg-transparent px-4 py-2 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-500 hover:text-white dark:border-gray-500 dark:text-slate-100 dark:shadow-num_d0 hover:dark:text-white">
                      View
                    </button>
                  </a>
                  <a href={item.otherlink} target="_blank">
                    <button className="mt-2 rounded-lg border bg-transparent px-4 py-2 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-500 hover:text-white dark:border-gray-500 dark:text-slate-100 dark:shadow-num_d0">
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
