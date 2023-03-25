import { useId } from 'react'
import React, { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/Container'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { Button } from './Button'
import { query, orderBy, limit, documentId } from 'firebase/firestore'

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

export function Content() {
  const [cseaiml, setCseaiml] = useState([])
  const [otherlinks, setOtherlinks] = useState([])
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await database
          .collection('otherlinks')
          .orderBy('createdate', 'desc')
          .get()
        console.log(response)
        const data = response.docs.map((doc) => doc.data())
        setOtherlinks(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <section className="bg-indigo-50 dark:bg-gray-900">
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-center text-2xl font-medium tracking-tight text-gray-900">
            Shared Links
          </h2>
          <p className="mt-2 text-center text-lg text-gray-500 dark:text-white">
            Youtube videos and other website links to related to Respective
            Subjects
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:items-center"
        >
          {otherlinks.map((item) => (
            <li key={item.id} className="relative">
              <div className="flex flex-col rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 dark:shadow-num_d">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-gray-500 line-clamp-3 dark:text-white/80">
                  {item.description}
                </p>
                {item.links?.map((link) => (
                  <div>
                    <p className="mt-3 dark:text-white/90">{link.urltitle}</p>
                    <a
                      href={link.url}
                      target="_blank"
                      className="mt-3 text-sm font-medium text-blue-800 hover:text-indigo-500 dark:text-blue-600"
                    >
                      {String(link.url).length > 35
                        ? String(link.url).substring(0, 35) + '...'
                        : String(link.url)}
                    </a>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <div className="py-10">
          <button className="mt-2 rounded-md border-2 border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-500 hover:text-white dark:border-blue-100 dark:text-white">
            <a href="https://cgpa-estimator.vercel.app/#/otherlinks">
              Contribute Links
            </a>
          </button>
        </div>
      </Container>
    </section>
  )
}
