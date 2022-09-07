import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Newsletter } from '@/components/Newsletter'
import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'
import { Author } from '@/components/Author'
import { CallToAction } from '@/components/CallToAction'


export default function Home() {
  return (
    <>
      <Head>
        <title>StudyConf - An Open-Source Notes sharing Platform</title>
        <meta
          name="description"
          content="Open-Source platform for Engineering Lecture Notes and Online Study Material for Students"
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <CallToAction />
        {/* <Speakers /> */}
        <Schedule />
        {/* <Sponsors /> */}
        <Author />
        {/* <Newsletter /> */}
      </main>
      <Footer />
    </>
  )
}
