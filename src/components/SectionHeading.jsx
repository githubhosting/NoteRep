export function SectionHeading({ number, children, ...rest }) {
  return (
    <h2
      className="inline-flex items-center rounded-full py-1 px-4 text-blue-600 ring-1 ring-inset ring-blue-600"
      {...rest}
    >
      {/* <span className="font-mono text-sm" aria-hidden="true">
        {number.padStart(2, '0')}
      </span> */}
      {/* <span className="ml-3 h-3.5 w-px bg-blue-600/20" aria-hidden="true" /> */}
      <span className="ml-3 text-base font-medium tracking-tight">
        {children}
      </span>
    </h2>
  )
}
