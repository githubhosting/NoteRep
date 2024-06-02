import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

const communilinks = [
  {
    name: "Securit Club's Community",
    description:
      'A community of like minded individuals who support cybersecurity and FOSS.',
    href: 'https://securit.club/links',
  },
  {
    name: 'Streamlit Community',
    description: 'Telegram Group',
    href: 'https://t.me/streamlitcommunity',
  },
  {
    name: 'GDSE Community',
    description: 'Telegram Group',
    href: 'https://t.me/dscrit',
  },
  {
    name: 'advAIta Community',
    description: 'A community of AI and ML Developers',
    href: 'https://discord.com/invite/ZSKT4bRmUq',
  },
  {
    name: 'Machine Learning Community',
    description: 'Telegram Channel',
    href: 'https://t.me/mlforbeginnners',
  },
  {
    name: 'Code RIT Community',
    description: 'Telegram Group',
    href: 'https://t.me/+JkfLZPe6p0cyNmY9',
  },
  {
    name: 'Anime Club',
    description: 'WhatsApp Group',
    href: 'https://chat.whatsapp.com/CJavyN3TBZ3GtkVUiIp5ya',
  },
]
export default function NoterepBot_() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Dark Mode
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.theme = 'light'
    localStorage.theme = 'dark'
    localStorage.removeItem('theme')
  }, [])

  return (
    <>
      <Head>
        <title>
          CommuniLink - Explore, Connect, Engage | Connecting College
          Communities all at one place.
        </title>
        <meta
          name="description"
          content="CommuniLink - Connecting College Communities all at one place."
        />
        <meta name="theme-color" content="black-translucent" />
        <meta
          name="google-site-verification"
          content="gYJr3zyNUad36lu_-fZx1x5r272Wt_RBB26MWCSYxPA"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="noterep, notes, notes sharing, notes msrit, noterep.vercel.app"
        />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <Header />
      <main>
        <section className="relative bg-indigo-50 py-7 pb-10 dark:bg-gray-900 sm:py-10">
          <Container>
            <div className="relative mx-auto max-w-7xl px-1 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
                <p className="text-center tracking-wider text-black dark:text-white">
                  Explore, Connect, Engage | Connecting All College Communities
                  at one place.
                </p>
                <p className="text-center italic text-black dark:text-[#fefefe]">
                  Feel free to approach me to add your community to this list.
                </p>
                <ul
                  role="list"
                  className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-10 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:items-center"
                >
                  {communilinks.map((item) => (
                    <li key={item.id} className="relative">
                      <div className="flex flex-col rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <h3 className="text-md font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                        </div>
                        <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-white/80">
                          {item.description}
                        </p>
                        <div>
                          <a
                            href={item.href}
                            target="_blank"
                            className="mt-3 text-sm font-medium text-blue-800 hover:text-indigo-500 dark:text-blue-600"
                          >
                            {String(item.href).length > 17
                              ? String(item.href).substring(0, 35) + '...'
                              : String(item.href)}
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      {showButton && (
        <button onClick={scrollToTop} className="back-to-top shadow-lg">
          <ArrowCircleUpIcon
            sx={{
              fontSize: '40px',
              width: 40,
              height: 40,
              padding: 0.7,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #002a8f, #00b5f5)',
            }}
          />
        </button>
      )}
    </>
  )
}
