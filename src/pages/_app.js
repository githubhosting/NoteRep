import { useEffect } from 'react'
import Head from 'next/head'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            console.log('Service Worker registration successful')
          },
          function (err) {
            console.log('Service Worker registration failed:', err)
          }
        )
      })
    }
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Your comprehensive educational resource and note-taking companion" />
        <meta name="theme-color" content="#0a6dd6" />
        <title>NoteRep</title>

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
