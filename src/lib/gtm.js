export const gtmVirtualPageView = (rest) => {
  window.dataLayer?.push({
    event: 'VirtualPageView',
    ...rest,
  })
}

export default function Page2() {
  return <h1>Hello world!</h1>
}

export async function getStaticProps() {
  return {
    props: { page: 'page 2' }, // is passed up to the custom app as pageProps
  }
}
