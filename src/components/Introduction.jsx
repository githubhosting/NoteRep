import { Container } from '@/components/Container'
import logoTransistor from '@/images/logos/rysecamp.svg'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { ButtonLink } from './Button1'

export function Introduction() {
  return (
    <section
      id="sponsors"
      aria-labelledby="introduction-title"
      className="pt-20 pb-16 sm:pb-20 md:pt-36 lg:py-32"
    >
      <h2 id="introduction-title" className="sr-only">
        Introduction
      </h2>
      <Container>
        <p className="font-display text-4xl font-bold tracking-tight text-slate-900">
          I have partnered with a Learning Platform
        </p>
        <p className="mt-4 font-display text-4xl text-lg font-bold tracking-tight tracking-tight text-slate-700">
          “
          <a
            href="https://rysecamp.com/"
            className="link font-display text-4xl font-bold tracking-tight text-blue-600 underline visited:text-blue-600 hover:text-blue-800"
          >
            Rysecamp
          </a>
          ”.
        </p>

        <p className="mt-4 text-lg tracking-tight text-slate-700">
          "I wanted to explore various fields in Engineering, but on other
          platforms I just end up dropping out of courses because they never
          end! thats where Rysecamp comes into picture. Here you can get
          familiar with any topic pretty quickly!"
        </p>

        <p className="mt-4 text-lg tracking-tight text-slate-700">
          <i>Rysecamp</i> is a platform where users can learn 15 min courses in
          the form of easy bytes - a fun learning feed on topics like Coming up
          with a cool business idea, Building your first app, Studying Overseas,
          Data Science 101, Cracking top internships, Funding your startup etc.
        </p>
        <div className="mt-5">
          <p className="text-lg tracking-tight text-slate-900">
            Community for MSRIT students where they will share some of their
            content for free.
          </p>
          <a
            href="https://chat.whatsapp.com/DE8xZjQiPSXJZeMp1Ec3p5"
            className="text-base font-medium tracking-tight text-blue-600 hover:text-blue-800"
          >
            Join here &rarr;
          </a>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-blue-900 sm:text-5xl">
          1 year access to Rysecamp:
        </p>
        <ul className="mt-8 space-y-3 text-lg tracking-tight text-slate-700">
          {[
            '60+ Courses & Workshops',
            '30 mins Courses + Certificates',
            'Quick courses for top domains and career growth',
            'Learning, one easy byte at a time',
          ].map((feature) => (
            <li key={feature} className="flex">
              <svg
                aria-hidden="true"
                className="h-8 w-8 flex-none fill-blue-500"
              >
                <path d="M11.83 15.795a1 1 0 0 0-1.66 1.114l1.66-1.114Zm9.861-4.072a1 1 0 1 0-1.382-1.446l1.382 1.446ZM14.115 21l-.83.557a1 1 0 0 0 1.784-.258L14.115 21Zm.954.3c1.29-4.11 3.539-6.63 6.622-9.577l-1.382-1.446c-3.152 3.013-5.704 5.82-7.148 10.424l1.908.598Zm-4.9-4.391 3.115 4.648 1.661-1.114-3.114-4.648-1.662 1.114Z" />
              </svg>
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xl tracking-tight text-blue-900">
          At the price <del>₹999</del> <br></br>₹99 only!
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          If you wish to access all the course on the app, Message me your email
          id to get 89% off on membership.<br></br>
          <i>I'm selecting only few students to get this offer.</i>
        </p>
        <p className="mt-5">
          <a
            href="https://wa.me/919945332995?text=I want to know more about Rysecamp Subscription"
            className="fill text-base font-medium tracking-tight text-blue-600 hover:text-blue-800"
          >
            Message here &rarr;
          </a>
        </p>
      </Container>
    </section>
  )
}
