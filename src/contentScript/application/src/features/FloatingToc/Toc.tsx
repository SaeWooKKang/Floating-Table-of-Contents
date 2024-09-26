import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface Props {
  onTap: () => void
  showBigger: boolean
}

type HeaderInfo = {
  text: string
  id: string
  level: number
}

export const Toc = (props: Props) => {
  const [headers, setHeaders] = useState<HeaderInfo[] | null>(null);

  useEffect(() => {
    const main = document.querySelector('main')

    const headers = main 
      ? main.querySelectorAll('h1, h2, h3, h4') 
      : document.querySelectorAll('h1, h2, h3, h4');

    headers.forEach((header, index) => {
      if (header.id !== 'toc-title') {
        header.id = `toc-header-${index}`
      }
    })
    
    const info: HeaderInfo[] = [...headers]
      .filter(header => header.id !== 'toc-title')
      .map((header, index) => {
        const [_, level] = [...header.tagName]

        return ({
          text: header.textContent ?? '',
          id: `toc-header-${index}`,
          level: Number(level)
        })
      })

    setHeaders(info)
  }, [])

  return (
    <motion.div
      layout
      onClick={props.onTap}
      style={{height: 'calc(100% - 55px)', width: '100%', padding: '20px 10px 10px', outline: 'none', overflow: 'auto'}}
    >
      <ul style={{fontSize: props.showBigger ? '16px': '13px',}}>
        {headers?.map((header) => {
          return (
            <motion.li 
              key={header.id} 
              style={{paddingLeft: header.level * 10}} 
             
            >
              <a 
                href={`#${header.id}`}
                onClick={e => e.stopPropagation()}
              >
                {header.text}
              </a>
            </motion.li>
          )
        })}
      </ul>
  </motion.div>
  )
}
