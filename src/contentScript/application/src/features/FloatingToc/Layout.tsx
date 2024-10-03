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
        className="absolute top-0  right-0 bottom-0 left-0 w-full overflow-hidden pointer-events-none z-[1000]"
        ref={ref}
      >
        {props.children}
      </div>
    )
  },
)
