import { Container } from '@/components/Container'
import { ButtonLink } from './Button1'

export function ContentSylCy() {
  return (
    <section
      id="Syllabus"
      aria-labelledby="introduction-title"
      className="pt-5 pb-0 sm:pb-0 md:pt-8 lg:pt-5"
    >
      <Container>
        <p className="font-display text-3xl font-bold tracking-tight text-slate-900">
          Curriculum for CSE (Cyber Security)
        </p>
        <ButtonLink
          href="/documents/Syllabus 3 & 4 sem Cyber Security.pdf"
          rel="noreferrer"
          target="_blank"
          className="mt-10 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          Click here to Download
        </ButtonLink>
        <iframe
          src="https://drive.google.com/file/d/1vaTtU3Fv-fxWu15H29aQaO2w8Nj_2yw-/preview"
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
