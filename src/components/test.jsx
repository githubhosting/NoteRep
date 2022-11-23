//   plugins: [require('@tailwindcss/line-clamp')]

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

const data = [
  {
    id: 1,
    title: 'Title 1',
    description: 'description',
    image: 'https://i.ibb.co/7bQQYkX/note-rep.png',
    link: '',
    tag: 'tag',
  },
  {
    id: 2,
    title: 'title 2',
    description: 'description',
    image: 'https://i.ibb.co/7bQQYkX/note-rep.png',
    link: '',
    tag: 'tag 2',
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
            Links to CSE(AI & ML) Notes
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            With typical market returns, you have to start young to secure your
            future. With Pocket, it’s never too late to build your nest egg.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {data.map((item) => (
            <li className="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm">
              {/* <feature.icon className="h-8 w-8" /> */}
              <div className="rounded-[10px] bg-white p-5 sm:p-6">
                <h3 className="text-center text-base font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-center text-gray-700">Even Semester</p>
                <p className="mt-1 text-center text-xs text-gray-700">
                  {item.description}
                </p>
                <div className="flex justify-center">
                  <button className="mt-2 rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-500 hover:text-white">
                    <a href={item.link} target="_blank">
                      Visit
                    </a>
                  </button>
                </div>
                <div class="mt-4 flex flex-wrap justify-center gap-1">
                  <span class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                    {item.tag}
                  </span>
                </div>
              </div>
            </li>
          ))}
          {cseaiml.map((item) => (
            <li className="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm">
              {/* <feature.icon className="h-8 w-8" /> */}
              <div className="rounded-[10px] bg-white p-5 sm:p-6">
                <h3 className="text-center text-base font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-center text-gray-700">Even Semester</p>
                <p className="mt-1 text-center text-xs text-gray-700">
                  {item.description}
                </p>
                <div className="flex justify-center">
                  <button className="mt-2 rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-500 hover:text-white">
                    View
                  </button>
                </div>
                <div class="mt-4 flex flex-wrap justify-center gap-1">
                  <span
                    class="whitespace
                  -nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
                  >
                    {item.tag}
                  </span>
                </div>
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

// import Head from 'next/head'
// import Link from 'next/link'
// import Image from 'next/image'
// import { AuthLayout } from '@/components/AuthLayout'
// import { Input } from '@/components/Input'
// import { Logo } from '@/components/Logo'
// import { Header } from '@/components/Header'
// import { Footer } from '@/components/Footer1'
// import Confetti from 'react-confetti'
// import React, { Component } from 'react'

// export default function uwon() {
//   const [width, setWidth] = React.useState(0)
//   const [height, setHeight] = React.useState(0)
//   React.useEffect(() => {
//     setWidth(window.innerWidth)
//     setHeight(window.innerHeight)
//     window.addEventListener('resize', () => {
//       setWidth(window.innerWidth)
//       setHeight(window.innerHeight)
//     })
//   }, [])
//   console.log(width, height)

//   return (
//     <>
//       <Header />
//       <Confetti
//         width={width}
//         height={height}
//         gravity={0.05}
//         recycle={false}
//         numberOfPieces={500}
//       />
//       <div class="bg-white  ">
//         <div class="z-20 mx-auto w-full py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
//           <h2 class="text-3xl font-extrabold text-black  sm:text-4xl">
//             <span class="block">Congratulations !!</span>
//             <span class="block text-indigo-500">U found it !!!.</span>
//           </h2>
//           <p class="mx-auto mt-4 max-w-md text-xl text-gray-400">Yeeeee</p>
//           <div class="lg:mt-0 lg:flex-shrink-0">
//             <div class="mt-12 inline-flex rounded-md shadow">
//               <a
//                 href="https://www.youtube.com/watch?v=QH2-TGUlwu4"
//                 type="button"
//                 class="w-full rounded-lg  bg-indigo-600 py-4 px-6 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
//               >
//                 Claim here
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
