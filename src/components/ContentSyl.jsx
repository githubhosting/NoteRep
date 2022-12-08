import { Container } from '@/components/Container'
import logoTransistor from '@/images/logos/rysecamp.svg'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { ButtonLink } from './Button1'

export function ContentSyl() {
  return (
    <section
      id="Syllabus"
      aria-labelledby="introduction-title"
      className="pt-5 pb-0 sm:pb-0 md:pt-8 lg:pt-5"
    >
      <Container>
        <p className="font-display text-4xl font-bold tracking-tight text-slate-900">
          Syllabus for CSE (AI & ML)
        </p>
        <ButtonLink
          href="/documents/Syllabus 3 & 4 Sem CSE AI & ML Final.pdf"
          rel="noreferrer"
          target="_blank"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 mt-10 w-full rounded-lg"
        >
          Click here to Download
        </ButtonLink>
        {/* <p className="mt-4 text-lg tracking-tight text-slate-700">
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
        <a
          href="https://drive.google.com/uc?export=download&id=1H4wdpRwhxGjEKOhVaeSEwT6OU3CJkI_n"
          className="text-lg tracking-tight text-slate-900 underline"
        >
          Know More
        </a>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          If you wish to take a membership on the app, Message me your Email ID
          or fill the form below to get <b>89% off</b>.<br></br>
          <i>Offer only for first 14 members, be the first one!</i>
          <br></br>
          Hope it brings you value.
        </p>
        <p className="mt-5">
          <a
            href="https://wa.me/919945332995?text=I want to know more about Rysecamp Subscription"
            className="fill text-base font-medium tracking-tight text-blue-600 hover:text-blue-800"
          >
            Message here &rarr;
          </a>
        </p> */}
        <iframe
          src="https://drive.google.com/file/d/1gfJHpC1Is6HOasFLDBouGXaaiKLnFZbo/preview"
          // width="640"
          height="1024"
          allow="autoplay"
          marginheight="0"
          marginwidth="0"
          className="mt-10 w-full"
        ></iframe>
      </Container>
    </section>
  )
}
