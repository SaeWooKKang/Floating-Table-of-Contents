import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { SwitchCase } from "../../components/SwitchCase";

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
  const [headingInfo, setHeadingInfo] = useState<HeadingInfo[] | null>(null);

  const hasHeadingInfo = headingInfo && headingInfo.length > 0;

  useEffect(() => {
    const DOM_DELAY = 300;
    
    setTimeout(() => {
    setHeadingInfo(getHeadingInfo())
    }, DOM_DELAY)
  }, [])

  return (
    <motion.div
      layout
      onClick={props.onTap}
      style={{height: 'calc(100% - 55px)', width: '100%', padding: '20px 10px 10px', outline: 'none', overflow: 'auto'}}
    >
      <SwitchCase 
        value={hasHeadingInfo ? 'fill' : 'empty'} 
        cases={{
          fill: (
            <ul style={{fontSize: props.showBigger ? '16px': '13px',}}>
            {headingInfo?.map((headingInfo) => {
              return (
                <motion.li 
                  key={headingInfo.id} 
                  style={{paddingLeft: headingInfo.level * 10}} 
                 
                >
                  <a 
                    href={`#${headingInfo.id}`}
                    onClick={e => e.stopPropagation()}
                  >
                    {headingInfo.text}
                  </a>
                </motion.li>
              )
            })}
          </ul>
          ),
          empty: (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 40px)'}}>
              empty..
            </div>
          )
        }}
      />
  </motion.div>
  )
}

function getHeadingInfo(): HeadingInfo[] {
  const main = document.querySelector('main')

  const headings = main 
    ? main.querySelectorAll('h1, h2, h3, h4') 
    : document.querySelectorAll('h1, h2, h3, h4');

  headings.forEach((heading, index) => {
    if (heading.id !== 'toc-title') {
      heading.id = `toc-heading-${index}`
    }
  })
  
  const info: HeadingInfo[] = [...headings]
    .filter(heading => heading.id !== 'toc-title')
    .map((heading, index) => {
      const [_, level] = [...heading.tagName]

      return ({
        text: heading.textContent ?? '',
        id: `toc-heading-${index}`,
        level: Number(level)
      })
    })
    .filter(headingInfo => headingInfo.text !== '')

    return info
}
