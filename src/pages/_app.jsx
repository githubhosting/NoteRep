  import 'focus-visible'
import '../styles/loader.css';
import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import Head from 'next/head'
import { gtmVirtualPageView } from '../lib/gtm.js'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // GTM pageview tracking
    const mainDataLayer = {
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    }
    gtmVirtualPageView(mainDataLayer)

    // Service Worker registration
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
  }, [pageProps])

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
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KGHQG9L');
      `}
      </Script>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
