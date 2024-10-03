import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SwitchCase } from '../../components/SwitchCase'

interface Props {
  onTap: () => void
  showBigger: boolean
}

type HeadingInfo = {
  text: string
  id: string
  level: number
}

export const Toc = (props: Props) => {
  const [headingInfo, setHeadingInfo] = useState<HeadingInfo[] | null>(null)

  const hasHeadingInfo = headingInfo && headingInfo.length > 0

  useEffect(() => {
    setHeadingInfo(getHeadingInfo())
  }, [])

  return (
    <motion.div
      layout
      onClick={props.onTap}
      className="h-[calc(100%-55px)] w-full overflow-auto outline-none pt-[15px] pb-[10px]"
    >
      <SwitchCase
        value={hasHeadingInfo ? 'fill' : 'empty'}
        cases={{
          fill: (
            <ul
              className="flex flex-col gap-[5px] text-toc-black"
              style={{
                fontSize: props.showBigger ? '16px' : '13px',
              }}
            >
              {headingInfo?.map((headingInfo) => {
                return (
                  <motion.li
                    key={headingInfo.id}
                    className="pr-[10px]"
                    style={{
                      paddingLeft: headingInfo.level * 10,
                    }}
                  >
                    <a href={`#${headingInfo.id}`} onClick={(e) => e.stopPropagation()}>
                      {headingInfo.text}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          ),
          empty: (
            <div className="flex justify-center items-center h-[calc(100%-40px)]">empty..</div>
          ),
        }}
      />
    </motion.div>
  )
}

function getHeadingInfo(): HeadingInfo[] {
  const main = document.querySelector('main')

  const headings = main
    ? main.querySelectorAll('h1, h2, h3, h4')
    : document.querySelectorAll('h1, h2, h3, h4')

  headings.forEach((heading, index) => {
    if (heading.id !== 'toc-title') {
      heading.id = `toc-heading-${index}`
    }
  })

  const info: HeadingInfo[] = [...headings]
    .filter((heading) => heading.id !== 'toc-title')
    .map((heading, index) => {
      const [_, level] = [...heading.tagName]

      return {
        text: heading.textContent ?? '',
        id: `toc-heading-${index}`,
        level: Number(level),
      }
    })
    .filter((headingInfo) => headingInfo.text !== '')

  return info
}
