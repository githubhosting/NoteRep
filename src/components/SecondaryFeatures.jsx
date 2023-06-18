import { useId } from 'react'
import { usePWAInstall } from 'react-use-pwa-install'
import { Container } from '@/components/Container'

const data = [
  {
    title: 'NoteRep Forum',
    subtitle: 'Beta feature!',
    button: 'Visit',
    href: '/noterep-forum',
  },
  {
    title: 'SIS Parent Portal',
    subtitle: 'Even Sem 2022',
    button: 'Visit',
    href: 'https://parent.msrit.edu/',
  },
  {
    title: 'Idea Repository',
    subtitle: 'Portal for submiting your ideas to College',
    button: 'Visit',
    href: 'https://idearepo.vercel.app/',
  },
]

export function SecondaryFeatures() {
  const install = usePWAInstall()
  return (
    <section
      id="secondary-features"
      aria-label="Features for building a portfolio"
      className="py-5 pt-10 dark:bg-cost5 sm:py-8"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-5xl lg:px-8">
          <Container>
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-center text-3xl font-medium tracking-tight text-gray-900 dark:text-white">
                Some Important Links:
              </h2>
            </div>
            <ul
              role="list"
              className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
            >
              {data.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-gray-200 p-5 shadow-lg hover:shadow dark:border-slate-900 dark:shadow-num_d"
                >
                  <h3 className="text-center text-base font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-center text-gray-700 dark:text-slate-50">
                    {item.subtitle}
                  </p>
                  {/* <p className="mt-1 text-center text-xs text-gray-700 dark:text-slate-50">
                    {item.description}
                  </p> */}
                  <div className="flex justify-center">
                    <a
                      className="mt-2 rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-500 hover:text-white dark:border-blue-300 dark:text-blue-400 hover:dark:text-white"
                      href={item.href}
                      target="_blank"
                    >
                      {item.button}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 rounded-xl border p-4 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none">
              {[
                ['Total Web Clics*', '5.97K'],
                ['Total impressions*', '12.33K'],
              ].map(([name, value]) => (
                <div key={name}>
                  <dt className="font-mono text-sm text-blue-600 dark:text-zinc-100">
                    {name}
                  </dt>
                  <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-blue-900 dark:text-zinc-50">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </div>
    </section>
  )
}
