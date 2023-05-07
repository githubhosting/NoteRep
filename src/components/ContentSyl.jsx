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
      className="bg-indigo-50 pb-0 pt-5 dark:bg-cost5 sm:pb-0 md:pt-8 lg:pt-5"
    >
      <Container>
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          4th Sem Curriculum for CSE (CI & CY)
        </h1>
        <ButtonLink
          href="/documents/Syllabus 4 Sem CSE (CI & CY).pdf"
          rel="noreferrer"
          target="_blank"
          className="mt-10 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          Click here to Download
        </ButtonLink>
        <iframe
          src="https://drive.google.com/file/d/1SM_yecGubg92HlSUGkYzKigoQEJgAgXT/preview"
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
