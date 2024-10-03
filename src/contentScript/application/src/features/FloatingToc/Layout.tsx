export const Layout = (props: {
  children: React.ReactNode
}) => {
  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-[1000]">
      {props.children}
    </div>
  )
}
