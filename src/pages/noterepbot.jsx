import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import {
  CloseIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
} from '@/components/icons'
import { Bot } from '@/components/Bot'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { Switch } from '@headlessui/react'

function MobileNavItem({ href, children }) {
  const router = useRouter()
  let isActive = router.pathname === href || router.pathname === `/${href}`

  return (
    <li className="block py-2">
      <Popover.Button
        as={Link}
        href={href}
        className={clsx(
          'block w-full text-left',
          isActive
            ? 'text-blue-500 dark:text-blue-400'
            : 'text-zinc-600 dark:text-zinc-300'
        )}
      >
        {children}
      </Popover.Button>
    </li>
  )
}

function MobileNavigation(props) {
  return (
    <Popover {...props}>
      <Popover.Button className="group flex items-center rounded-full bg-zinc-100/30 px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-2xl transition-all duration-300 hover:bg-zinc-100/40 dark:bg-zinc-900/30 dark:text-zinc-200 dark:ring-white/10 dark:hover:bg-zinc-900/40 dark:hover:ring-white/20">
        Menu
        <ChevronDownIcon className="ml-2 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-40 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white/95 p-8 ring-1 ring-zinc-900/5 backdrop-blur-xl dark:bg-zinc-800/95 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </Popover.Button>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base leading-7 text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                <MobileNavItem href="/">Home</MobileNavItem>
                <MobileNavItem href="/minisis">Mini SIS</MobileNavItem>
                <MobileNavItem href="/noterepbot">AI Chat Bot</MobileNavItem>
                <MobileNavItem href="/communilink">CommuniLink</MobileNavItem>
                <MobileNavItem href="/links">Other Links</MobileNavItem>
                <MobileNavItem href="https://myselfshravan.github.io/">
                  Developer
                </MobileNavItem>
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

function NavItem({ href, children }) {
  const router = useRouter()
  let isActive = router.pathname === href || router.pathname === `/${href}`

  return (
    <li className="relative block px-2 py-1">
      <Link
        href={href}
        className={clsx(
          'relative block px-2 py-1 text-sm transition-all duration-200',
          isActive
            ? 'text-blue-500 dark:text-blue-400'
            : 'text-zinc-600 hover:text-blue-500 dark:text-zinc-300 dark:hover:text-blue-400'
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0" />
        )}
      </Link>
    </li>
  )
}

function DesktopNavigation(props) {
  return (
    <nav {...props}>
      <ul
        className="flex rounded-full bg-zinc-100/30 px-2 py-1 text-sm font-medium shadow-lg 
      shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md transition-all duration-300 hover:bg-zinc-100/40 
      dark:border-white/10 dark:bg-zinc-900/30 dark:shadow-white/5 dark:ring-white/10 dark:hover:bg-zinc-900/40"
      >
        <NavItem href="/minisis">Mini SIS</NavItem>
        <NavItem href="/chat">Chat</NavItem>
        <NavItem href="/noterepbot">AI Chat Bot</NavItem>
        <NavItem href="/communilink">CommuniLink</NavItem>
        <NavItem href="/links">Other Links</NavItem>
      </ul>
    </nav>
  )
}

function ModeToggle() {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function toggleMode() {
    disableTransitionsTemporarily()

    let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = document.documentElement.classList.toggle('dark')

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    } else {
      window.localStorage.isDarkMode = isDarkMode
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="group rounded-full bg-zinc-100/30 px-2 py-1.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-2xl transition-all duration-300 hover:bg-zinc-100/40 dark:bg-zinc-900/30 dark:ring-white/10 dark:hover:bg-zinc-900/40 dark:hover:ring-white/20"
      onClick={toggleMode}
    >
      <SunIcon className="h-5 w-5 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-blue-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-blue-600" />
      <MoonIcon className="hidden h-5 w-5 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-blue-500" />
    </button>
  )
}

export function CompactHeader() {
  return (
    <header className="pointer-events-none sticky top-0 z-50 bg-transparent px-2">
      <div className="m-2 backdrop-blur-sm rounded-xl px-3 py-2 shadow-black/5 ring-1 ring-black/10 dark:shadow-white/5 dark:ring-white/10 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative flex items-center gap-2">
            <div className="flex flex-1">
              <div className="rounded-full shadow-lg dark:shadow-num_d2">
                <a
                  href="/"
                  className="pointer-events-auto flex items-center justify-center rounded-full bg-zinc-100/30 p-1.5 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-2xl transition-all duration-300 hover:bg-zinc-100/40 dark:bg-zinc-900/30 dark:ring-white/10 dark:hover:bg-zinc-900/40 dark:hover:ring-white/20"
                >
                  <HomeIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="flex justify-end md:items-center md:justify-center">
              <MobileNavigation className="pointer-events-auto md:hidden" />
              <DesktopNavigation className="pointer-events-auto hidden md:block" />
            </div>
            <div className="flex justify-end md:flex-1">
              <div className="pointer-events-auto">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function NoterepBot_() {
  const [showButton, setShowButton] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [userId, setUser] = useState('')

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
    let userId = localStorage.getItem('userId')
    setUser(userId)
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
        <title>AI Bot - NoteRep Chat Bot</title>
        <meta
          name="description"
          content="NoteRep AI Chat Bot - An Contextual Bot that responds faster than the speed of light."
        />
        <meta name="theme-color" content="black-translucent" />
        <meta
          name="google-site-verification"
          content="9l6jBCdCjl0ZW1Q6RrsllF3h9y5WdO-_rNvO1BKgH9s"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="noterep, notes, notes sharing, notes msrit, noterep.vercel.app"
        />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <div className="flex min-h-screen flex-col bg-indigo-50 dark:bg-gray-900 dark:text-gray-100">
        <CompactHeader />
        <main className="flex flex-1 flex-col bg-indigo-50 dark:bg-gray-900">
          <div className="mx-2 mb-2 max-w-3xl rounded-lg bg-indigo-50 px-4 py-1 shadow dark:bg-slate-800 sm:px-6 lg:mx-auto lg:w-full lg:px-8">
            <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
              NoteRep AI Chat Bot
            </h1>
            <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-200">
              Experience lightning-fast responses with this AI Chatbot
              <span className="text-xs italic text-gray-500 dark:text-gray-100">
                {' '}
                Powered by Llama 3.1 8B
              </span>
            </p>
            <p className="mt-1 text-center text-xs text-gray-500 dark:text-gray-400">
              User ID: {userId}
            </p>
            {/* add a toogle for fun mode  */}
            <div className="flex flex-row items-center justify-center gap-2 py-3">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? 'bg-blue-600' : 'bg-white dark:bg-gray-500'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-gray-200 transition dark:bg-white`}
                />
              </Switch>
              <p className="text-xs font-semibold text-slate-900 dark:text-zinc-50">
                {enabled ? 'Fun Mood' : 'Regular Mood'}
              </p>
            </div>
          </div>
          <Bot moodstatus={enabled} />
        </main>
      </div>
    </>
  )
}
