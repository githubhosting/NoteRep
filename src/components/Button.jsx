import Link from 'next/link'
import clsx from 'clsx'

const styles =
  'inline-flex justify-center rounded-2xl bg-blue-600 px-4 py-2 text-base font-semibold text-white hover:bg-blue-500 active:text-white/70 focus:outline-none focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-500 dark:bg-blue-700 dark:highlight-white/20 dark:hover:bg-blue-800'

export function Button({ className, ...props }) {
  return <button className={clsx(styles, className)} {...props} />
}

export function ButtonLink({ href, className, ...props }) {
  return (
    <Link href={href}>
      <p className={clsx(styles, className)} {...props} />
    </Link>
  )
}
