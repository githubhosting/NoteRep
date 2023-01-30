import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

export function Footer() {
  return (
    <footer className="py-10 dark:bg-cost5">
      <Container className="flex flex-col items-center justify-between">
        {/* <Logo className="h-12 w-auto text-slate-900" /> */}

        <p className="mt-6 text-base text-slate-500 md:mt-0">
          WebPage designed by{' '}
          <a className="underline" href="https://myselfshravan.github.io/">
            Shravan
          </a>
        </p>
      </Container>
    </footer>
  )
}
