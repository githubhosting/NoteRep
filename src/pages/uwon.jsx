import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { AuthLayout } from '@/components/AuthLayout'
import { Input } from '@/components/Input'
import { Logo } from '@/components/Logo'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer1'
import Confetti from 'react-confetti'
import React, { Component } from 'react'

export default function uwon() {
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)
  React.useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    //add event listener to on resize
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    })
  }, [])
  console.log(width, height)

  return (
    <>
      <Header />
      <Confetti
        width={width}
        height={height}
        gravity={0.05}
        recycle={false}
        numberOfPieces={500}
        // className="h-full w-full"
      />
      <div class="bg-white  ">
        <div class="z-20 mx-auto w-full py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
          <h2 class="text-3xl font-extrabold text-black  sm:text-4xl">
            <span class="block">Congratulations !!</span>
            <span class="block text-indigo-500">U found it !!!.</span>
          </h2>
          <p class="mx-auto mt-4 max-w-md text-xl text-gray-400">Yeeeee</p>
          <div class="lg:mt-0 lg:flex-shrink-0">
            <div class="mt-12 inline-flex rounded-md shadow">
              <a
                href="https://www.youtube.com/watch?v=QH2-TGUlwu4"
                type="button"
                class="w-full rounded-lg  bg-indigo-600 py-4 px-6 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
              >
                Claim here
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
