function LoadingNew() {
  const quotes = [
    '404: Patience Not Found.',
    'Making you wait builds character.',
    'If this takes too long, just blame the WiFi.',
    'Go ahead -- hold your breath!',
    'Alt-F4 speeds things up...',
    "We're working very Hard .... Really",
    'You are number 2843684714 in the queue',
    '99% done… wait, now it’s 12%?',
    "It's not you. It's me",
    'This page is heavier than it looks.',
    'My other loading screen is much faster',
    'Almost done… just kidding!',
  ]
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="loader1">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
      <div className="mt-16"></div>
      <p className="quote mt-4 px-4 text-center text-lg text-white">
        {randomQuote}
      </p>
    </div>
  )
}

export default LoadingNew
