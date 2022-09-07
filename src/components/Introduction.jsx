import { Container } from '@/components/Container'

export function Introduction() {
  return (
    <section
      id="introduction"
      aria-labelledby="introduction-title"
      className="pt-20 pb-16 sm:pb-20 md:pt-36 lg:py-32"
    >
      <h2 id="introduction-title" className="sr-only">
        Introduction
      </h2>
      <Container>
        <p className="font-display text-4xl font-bold tracking-tight text-slate-900">
          “Everything Starts as a Square” is a book and video course that
          teaches you a simple method to designing icons that anyone can learn.
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          Before I learned how to design icons myself, I always imagined that
          they were drawn by hand using the pen tool, some sort of fancy
          graphics tablet, and hours and hours spent manually fine-tuning bezier
          curves.
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          But it turns out this isn’t how great icon designers work at all.
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          In “Everything Starts as a Square”, you’ll learn the systems experts
          use to create pixel perfect icons, without relying on a steady hand.
        </p>
        <ul className="mt-8 space-y-3 text-lg tracking-tight text-slate-700">
          {[
            'Using boolean operations to combine basic shapes into complex icons',
            'How to adapt icons to different sizes',
            'Translating icons from an outline style to a solid style',
            'Identifying the characteristics that make an icon set cohesive',
            'Figma features and keyboard shortcuts to speed up your workflow',
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
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          By the end of the book, you’ll have all the confidence you need to dig
          in and start creating beautiful icons that can hold their own against
          any of the sets you can find online.
        </p>
        <p className="mt-10">
          <a
            href="#free-chapters"
            className="text-base font-medium tracking-tight text-blue-600 hover:text-blue-800"
          >
            Get two free chapters straight to your inbox &rarr;
          </a>
        </p>
      </Container>
    </section>
  )
}
