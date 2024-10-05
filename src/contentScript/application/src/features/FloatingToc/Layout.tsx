export const Layout = (props: {
  children: React.ReactNode
}) => {
  return (
    <div className="pointer-events-none absolute top-0 left-0 z-[1000] w-full overflow-hidden">
      {props.children}
    </div>
  )
}
