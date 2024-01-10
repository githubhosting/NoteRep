import { useId } from 'react'
import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/Container'
import { ButtonLink } from '@/components/Button'

const cseaimlstatic = [
  {
    title: 'Numerical Techniques and Probability',
    description: '(2:1:0) CI41',
    link: 'https://drive.google.com/drive/folders/1YofEy5hEa78PZ0fa6x9kgVEzK1KyGodR?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Data Communication and Networking',
    description: '(2:0:1) CI42',
    link: 'https://drive.google.com/drive/folders/1HcJSkqZ7xgWW2cymK8EtS5X_7MI5v84F?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Design and Analysis of Algorithms',
    description: '(2:1:0) CI43',
    link: 'https://drive.google.com/drive/folders/1bVTy8hA9HHbqTQyDxXsuz8xsxK0JDM53?usp=sharing',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Intro to AI',
    description: '(3:0:0) CI44',
    link: 'https://drive.google.com/drive/folders/1W6rODQ0QdaD08dxEn4HfEXFSmMWwxouK?usp=sharing',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Operating System',
    description: '(3:0:0) CI45',
    link: 'https://drive.google.com/drive/folders/1dvSqj7c3uQNdhq2qLu7yFYak5wMVBV3b?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Embedded Systems Lab',
    description: '(0:0:1) CIL46',
    link: 'https://drive.google.com/drive/folders/197mT9sqkxg0BwZU7aZewMeN2aQp32Ppq?usp=share_link',
    otherlink: 'https://github.com/githubhosting',
    extra: 'This is github repository',
    tag: '',
  },
  {
    title: 'Algorithms Lab',
    description: '(0:0:1) CIL47',
    link: 'https://github.com/githubhosting',
    otherlink: '/links',
    extra: 'This is github repository',
    tag: '',
  },
  {
    title: 'Constitution and Ethics',
    description: '(1:0:0) HS492',
    link: 'https://drive.google.com/drive/folders/136vUZFuOtF3tBh1IAE-2cWvh-l0O17-m?usp=sharing',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Web Technologies Lab',
    description: '(0:0:1) CIL48',
    link: 'https://github.com/githubhosting/web-technologies-lab',
    otherlink: '/links',
    extra: 'This is github repository',
    tag: '',
  },
  {
    title: 'Ability Enhancement Course-IV',
    description: '(1:0:0) AEC410',
    link: 'https://drive.google.com/drive/folders/1Tk7i3tqSQWulVWmrVvEv5g-Sry_d49GD?usp=sharing',
    otherlink: '/links',
    tag: '',
  },
]
// Subjects:
// 1. BIG DATA ANALYTICS
// 2. MACHINE LEARNING
// 3. AUTOMATA THEORY AND COMPILER DESIGN
// 4. SOFTWARE ENGINEERING
// 5. ADVANCED COMPUTER NETWORKS
// 6. RESEARCH METHODOLOGY
// 7. JAVA LAB
// 8. R LAB
// 9. Environment Something
// Links
// 1.https://drive.google.com/drive/folders/1yKpnOtQxkLoiu5puvEkUBZmDS1rjt3YX?usp=drive_link
// 2.https://drive.google.com/drive/folders/1zqn9poZMiHQbKib3mCKNgWX-I6I_2h_N?usp=sharing
// 3.https://drive.google.com/drive/folders/1x4ECw1TWAmfzgytKWTN-ReMyWz13bM05?usp=drive_link
// 4.https://drive.google.com/drive/folders/1lwH45jAUJNsM1NwZ8WPIRYZZ4KAhDEuR?usp=drive_link
// 5.https://drive.google.com/drive/folders/1-pmiBr3mpl9IXmKJOCGgGb6QP2H3MPtb?usp=drive_link
// 6.https://drive.google.com/drive/folders/1XfSpA_pr-RaGzJLyICh5RtguPXX51KLz?usp=drive_link
const cseaimlstatic5 = [
  {
    title: 'Big Data Analytics',
    description: '(3:0:0) CI51',
    link: 'https://drive.google.com/drive/folders/1yKpnOtQxkLoiu5puvEkUBZmDS1rjt3YX?usp=drive_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Machine Learning',
    description: '(2:0:1) CI52',
    link: 'https://drive.google.com/drive/folders/1zqn9poZMiHQbKib3mCKNgWX-I6I_2h_N?usp=sharing',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Automata Theory and Compiler Design',
    description: '(2:0:1) CI53',
    link: 'https://drive.google.com/drive/folders/1x4ECw1TWAmfzgytKWTN-ReMyWz13bM05?usp=drive_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Software Engineering',
    description: '(3:0:0) CI54',
    link: 'https://drive.google.com/drive/folders/1lwH45jAUJNsM1NwZ8WPIRYZZ4KAhDEuR?usp=drive_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Advanced Computer Networks',
    description: '(3:0:0) CIE552',
    link: 'https://drive.google.com/drive/folders/1-pmiBr3mpl9IXmKJOCGgGb6QP2H3MPtb?usp=drive_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Research Methodology',
    description: '(3:0:0) AL58',
    link: 'https://drive.google.com/drive/folders/1XfSpA_pr-RaGzJLyICh5RtguPXX51KLz?usp=drive_link',
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
          <div className="flex justify-center">
            <ButtonLink
              target="_blank"
              href="https://docs.google.com/document/d/e/2PACX-1vR8wk2gz-Cnjhn8bQo5afLgVTQO9ZT-uptfjdhASSmwn74kmCm6ETrQrYCpC-jCFUwhf2EKNsW8v2vA/pub"
              className="hover:shadowpress mt-6 w-auto rounded-lg bg-blue-50 py-2 shadow-lg dark:text-white dark:hover:text-blue-200"
            >
              CIE 2 Portions (Tentative)
            </ButtonLink>
          </div>
        </div>
        <ul
          role="list"
          className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3 lg:items-center"
        >
          {cseaimlstatic5.map((item, index) => (
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
