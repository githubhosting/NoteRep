import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Fragment, useState, useEffect } from 'react'
import {
  CloseIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
} from '@/components/icons'

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
      <Popover.Button className="group flex items-center rounded-full bg-zinc-100/30 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-2xl transition-all duration-300 hover:bg-zinc-100/40 dark:bg-zinc-900/30 dark:text-zinc-200 dark:ring-white/10 dark:hover:bg-zinc-900/40 dark:hover:ring-white/20">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
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
                <MobileNavItem href="minisis">Mini SIS</MobileNavItem>
                <MobileNavItem href="noterepbot">AI Chat Bot</MobileNavItem>
                <MobileNavItem href="chat">Live Chat</MobileNavItem>
                <MobileNavItem href="communilink">CommuniLink</MobileNavItem>
                <MobileNavItem href="links">Other Links</MobileNavItem>
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
    <li className="relative block px-3 py-1">
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-1 transition-all duration-200',
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

function NavItem_External({ href, children }) {
  return (
    <li className="relative block px-3 py-1">
      <Link
        target="_blank"
        href={href}
        className={clsx(
          'relative block px-3 py-1 transition-all duration-200',
          'text-zinc-600 hover:text-blue-500 dark:text-zinc-300 dark:hover:text-blue-400'
        )}
      >
        {children}
      </Link>
    </li>
  )
}

function DesktopNavigation(props) {
  return (
    <nav {...props}>
      <ul
        className="flex rounded-full bg-zinc-100/30 px-3 py-1.5 text-sm font-medium shadow-lg 
      shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md transition-all duration-300 hover:bg-zinc-100/40 
      dark:border-white/10 dark:bg-zinc-900/30 dark:shadow-white/5 dark:ring-white/10 dark:hover:bg-zinc-900/40"
      >
        <NavItem href="minisis">Mini SIS</NavItem>
        <NavItem href="noterepbot">AI Chat Bot</NavItem>
        <NavItem href="chat">Live Chat</NavItem>
        <NavItem href="communilink">CommuniLink</NavItem>
        <NavItem href="links">Links</NavItem>
        <NavItem_External href="https://myselfshravan.github.io">
          Developer
        </NavItem_External>
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
      className="group rounded-full bg-zinc-100/30 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-2xl transition-all duration-300 hover:bg-zinc-100/40 dark:bg-zinc-900/30 dark:ring-white/10 dark:hover:bg-zinc-900/40 dark:hover:ring-white/20"
      onClick={toggleMode}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-blue-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-blue-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-blue-500" />
    </button>
  )
}

export function Header() {
  return (
    <header className="pointer-events-none sticky top-0 z-50 bg-transparent">
      <div className="m-3 backdrop-blur-sm rounded-xl px-4 py-3 shadow-black/5 ring-1 ring-black/10 dark:shadow-white/5 dark:ring-white/10 sm:px-16 lg:px-12 max-w-5xl mx-auto">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center gap-4">
            <div className="flex flex-1">
              <div className="rounded-full shadow-2xl dark:shadow-num_d2">
                <a
                  href="/"
                  className="pointer-events-auto flex items-center justify-center rounded-full bg-zinc-100/30 p-2.5 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-2xl transition-all duration-300 hover:bg-zinc-100/40 dark:bg-zinc-900/30 dark:ring-white/10 dark:hover:bg-zinc-900/40 dark:hover:ring-white/20"
                >
                  <HomeIcon />
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
