function LoadingNew() {
  const quotes = [
    'Go ahead -- hold your breath!',
    'Alt-F4 speeds things up...',
    "We're working very Hard .... Really",
    'You are number 2843684714 in the queue',
    'Well, this is embarrassing',
    "It's not you. It's me",
    'My other loading screen is much faster',
    'Web developers do it with <style>',
  ]
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  return (
    <div className="flex min-h-screen w-full items-center justify-center dark:bg-slate-900">
      <div className="loader1">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
      <p className="quote text-white">{randomQuote}</p>
    </div>
  )
}

export default LoadingNew
