import { useId } from 'react'
import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/Container'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

//Firebase Api Key
const firebaseConfig = {
  apiKey: 'AIzaSyACyiB2f-Sl8fbez4sjwBxJwn-eGadnXcg',
  authDomain: 'auth-44578.firebaseapp.com',
  projectId: 'auth-44578',
  storageBucket: 'auth-44578.appspot.com',
  messagingSenderId: '595971213871',
  appId: '1:595971213871:web:432717a56846feb84a14da',
  measurementId: 'G-BJWWD8H4BX',
}
firebase.initializeApp(firebaseConfig)
const database = firebase.firestore()

const cseaimlstatic = [
  {
    title: 'Linear Algebra & Integral Transforms',
    description: '(2:1:0) CI31',
    link: 'https://drive.google.com/drive/folders/1d126yrfEwfL1QqEL9cJcl3SHP6skil0G?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Data Base Management Systems',
    description: '(3:0:0) CI32',
    link: 'https://drive.google.com/drive/folders/1Jp1yODvx1-EO5SywKVLxsVdsqLYAf_d7?usp=share_link',
    otherlink: '/links',
    tag: 'SQL',
  },
  {
    title: 'Data Structures',
    description: '(3:0:0) CI33',
    link: 'https://drive.google.com/drive/folders/1xKwDfh47KlX5yOFw_zPK7gHJwnd64gIC?usp=share_link',
    otherlink: '/links',
    tag: 'C Programming',
  },
  {
    title: 'Computer organization and Architecture',
    description: '(3:0:0) CI34',
    link: 'https://drive.google.com/drive/folders/1sGeLN9AV2mPm3CxNCz8Ws9u0nwHNY33k?usp=share_link',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Discrete Mathematical Structures',
    description: '(2:1:0) CI35',
    link: 'https://drive.google.com/drive/folders/1UjfYJyCRSz8KtQeWxnypGEz9q1uIBbSs?usp=share_link',
    otherlink: '/links',
    // tag: 'Maths',
  },
  {
    title: 'Data Structures Laboratory',
    description: '(0:0:1) CIL36',
    link: '#',
    otherlink: '/links',
    tag: 'C Programming',
  },
  {
    title: 'OOPS Laboratory',
    description: '(0:0:1) CIL37',
    link: 'https://github.com/githubhosting/OOPS_Lab_CPP',
    otherlink: '/links',
    tag: 'C++',
  },
  {
    title: 'Universal Human Value Course ',
    description: '(2:0:0) UHV38',
    link: '#',
    otherlink: '/links',
    tag: '',
  },
  {
    title: 'Kannada (Kali / Manasu)',
    description: '(1:0:0) HS391/491',
    link: 'https://drive.google.com/drive/folders/1MIXAORMZ0GYUFJqYDjsYZbKYEnv8Rgch?usp=share_link',
    otherlink: '/links',
    tag: 'Language',
  },
  {
    title: 'Ability Enhancement Course-III',
    description: '(1:0:0) AEC310',
    link: '#',
    otherlink: '/links',
    tag: '',
  },
]

export function Content() {
  const [cseaiml, setCseaiml] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await database.collection('cseaiml').get()
        const data = response.docs.map((doc) => doc.data())
        setCseaiml(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <section>
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-center text-2xl font-medium tracking-tight text-gray-900">
            Links to CSE(AI & ML) Notes for 3rd Semester
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            NoteRep is a collection of undergraduate semester content
            marketplaces that contain all of the student notes, faculty notes,
            and solved previous year question papers for the majority of the
            courses.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3 lg:items-center"
        >
          {cseaimlstatic.map((item) => (
            <li className="rounded-xl border bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm">
              {/* <feature.icon className="h-8 w-8" /> */}
              <div className="rounded-[10px] bg-white p-5 sm:p-6">
                <h3 className="text-center text-base font-semibold uppercase text-gray-900">
                  {item.title}
                </h3>
                {/* <p className="mt-2 text-center text-gray-700">{item.content}</p> */}
                <p className="mt-1 text-center text-base text-gray-700">
                  {item.description}
                </p>
                <div className="flex justify-center gap-3">
                  <button className="mt-2 rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-500 hover:text-white">
                    <a href={item.link} target="_blank">
                      View
                    </a>
                  </button>
                  <button className="mt-2 rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-500 hover:text-white">
                    <a href={item.otherlink} target="_blank">
                      Other links
                    </a>
                  </button>
                </div>
                {item.tag && (
                  <div class="mt-4 flex flex-wrap justify-center gap-1">
                    <span class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
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

    // <article class="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm">
    //   <div class="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
    //     <time datetime="2022-10-10" class="block text-xs text-gray-500">
    //       10th Oct 2022
    //     </time>

    //     <a href="#">
    //       <h3 class="mt-0.5 text-lg font-medium text-gray-900">
    //         How to center an element using JavaScript and jQuery
    //       </h3>
    //     </a>

    //     <div class="mt-4 flex flex-wrap gap-1">
    //       <span class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
    //         Snippet
    //       </span>

    //       <span class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
    //         JavaScript
    //       </span>
    //     </div>
    //   </div>
    // </article>
  )
}
