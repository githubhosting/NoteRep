import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Newsletter } from '@/components/Newsletter'
import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'

export default function Home() {
  return (
    <>
      <Head>
        <title>StudyConf - An Open-Source Notes</title>
        <meta
          name="description"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum volutpat mi, ut tempor nulla cursus ut. Aliquam fermentum rutrum fringilla. Phasellus pharetra quis dolor a pulvinar. Fusce non nisl mauris vestibulum ante ipsum."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        {/* <Speakers /> */}
        <Schedule />
        <Sponsors />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
