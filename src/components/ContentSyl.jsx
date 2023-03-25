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
      className="bg-indigo-50 pt-5 pb-0 dark:bg-cost5 sm:pb-0 md:pt-8 lg:pt-5"
    >
      <Container>
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Curriculum for CSE (AI & ML)
        </h1>
        <ButtonLink
          href="/documents/Syllabus 3 & 4 Sem CSE AI & ML Final.pdf"
          rel="noreferrer"
          target="_blank"
          className="mt-10 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          Click here to Download
        </ButtonLink>
        <iframe
          src="https://drive.google.com/file/d/1gfJHpC1Is6HOasFLDBouGXaaiKLnFZbo/preview"
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
