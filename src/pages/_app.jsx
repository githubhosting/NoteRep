import 'focus-visible'
import '../styles/loader.css';
import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { gtmVirtualPageView } from '../lib/gtm.js'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const mainDataLayer = {
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    }

    gtmVirtualPageView(mainDataLayer)
  }, [pageProps])
  return (
    <>
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
