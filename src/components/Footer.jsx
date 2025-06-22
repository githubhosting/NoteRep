import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

export function Footer() {
  return (
    <footer className="py-8 dark:bg-cost5">
      <Container className="flex flex-col items-center justify-between">
        {/* <Logo className="h-12 w-auto text-slate-900" /> */}
        <p className="mt-2 text-base text-slate-500 md:mt-0">
          Platform developed by{' '}
          <a
            className="font-bold underline"
            href="https://myselfshravan.github.io"
          >
            Shravan
          </a>
        </p>
      </Container>
    </footer>
  )
}
