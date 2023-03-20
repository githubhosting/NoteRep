import { useId } from 'react'

import { Container } from '@/components/Container'

const data = [
  {
    title: 'Semester End Results',
    subtitle: 'Even Semester',
    button: 'Visit',
    href: 'https://exam.msrit.edu/eresultseven/',
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
                      className="mt-2 rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 shadow-lg shadow-blue-900/10 hover:border-transparent hover:bg-blue-500 hover:text-white dark:border-blue-300 dark:text-blue-400 hover:dark:text-white"
                      href={item.href}
                      target="_blank"
                    >
                      {item.button}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </div>
    </section>
  )
}
