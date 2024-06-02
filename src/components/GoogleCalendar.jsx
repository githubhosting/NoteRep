import React from 'react'

export function GCalendar({ url }) {
  return (
    <div className="border-t p-0 lg:flex lg:h-full lg:flex-col lg:p-4">
      <p className="flex items-center justify-center py-5 text-slate-900 dark:text-zinc-50 lg:flex-none">
        Calendar
      </p>
      <div className="rounded-xl border bg-white p-2 shadow-xl dark:border-gray-500 dark:bg-gray-900 dark:shadow-num_d1 lg:p-3">
        <div className="lg:flex lg:flex-auto lg:flex-col">
          <div className="flex text-xs leading-6 text-gray-700 dark:text-zinc-50 lg:flex-auto">
            {/* Desktop and mobile view*/}
            <div className="flex w-full justify-center rounded-lg bg-gray-200 shadow ring-1 ring-gray-200 dark:bg-slate-600 dark:bg-white/40 dark:ring-gray-500 lg:items-center lg:justify-center">
              <iframe
                src={url}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '420px',
                }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
