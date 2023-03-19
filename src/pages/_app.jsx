import 'focus-visible'
import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
