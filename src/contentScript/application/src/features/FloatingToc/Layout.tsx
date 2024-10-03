import { type ForwardedRef, forwardRef } from 'react'

export const Layout = forwardRef(
  (
    props: {
      children: React.ReactNode
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div
        className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[1000] w-full overflow-hidden"
        ref={ref}
      >
        {props.children}
      </div>
    )
  },
)
