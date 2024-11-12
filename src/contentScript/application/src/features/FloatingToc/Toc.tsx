import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { SwitchCase } from '../../components/SwitchCase'
import { useHeadings, useTocHighlight } from './toc.hook'

interface Props {
  onTap: () => void
  showBigger: boolean
}

export const Toc = (props: Props) => {
  const { headings, hasParsedHeading, parsedHeadings } = useHeadings()
  const { activeId, changeActiveId } = useTocHighlight({ headings: headings ?? [] })

  return (
    <motion.nav
      layout
      onClick={props.onTap}
      className="h-[calc(100%-55px)] w-full overflow-auto pt-[15px] pb-[10px] outline-none"
    >
      <SwitchCase
        value={hasParsedHeading ? 'fill' : 'empty'}
        cases={{
          fill: (
            <ul
              className="flex flex-col gap-[5px] text-toc-black"
              style={{
                fontSize: props.showBigger ? '16px' : '13px',
              }}
            >
              {parsedHeadings?.map((headingInfo) => {
                return (
                  <motion.li
                    key={headingInfo.id}
                    className={twMerge(
                      'w-fit pr-[10px] hover:underline',
                      activeId === headingInfo.id && 'text-toc-blue',
                    )}
                    style={{
                      paddingLeft: headingInfo.level * 10,
                    }}
                  >
                    <a
                      href={`#${headingInfo.id}`}
                      onClick={(e) => {
                        e.stopPropagation()

                        changeActiveId(headingInfo.id)
                      }}
                    >
                      {headingInfo.text}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          ),
          empty: (
            <div className="flex h-[calc(100%-40px)] items-center justify-center">empty..</div>
          ),
        }}
      />
    </motion.nav>
  )
}
