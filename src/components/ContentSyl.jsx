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
        <h1 className="text-center font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          4th Sem Curriculum for CSE (CI & CY)
        </h1>
        <div className="flex justify-center pt-10">
          <ButtonLink
            href="/documents/Updated Syllabus 4th Sem-1.pdf"
            rel="noreferrer"
            target="_blank"
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            Click here to Download
          </ButtonLink>
        </div>
        <iframe
          src="https://drive.google.com/file/d/1r6mf87QiGBt8XyyJp8OnJ_VMKNstHB_8/preview"
          height="1024"
          allow="autoplay"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          className="mt-10 w-full rounded-md lg:rounded-xl"
        ></iframe>
      </Container>
    </section>
  )
}
