import './index.css'
import { createContext, useEffect, useRef } from 'react'
import { createStore } from 'zustand'
import type { Position } from '../type'
import FloatingToc from './features/FloatingToc'

type TocProps = {
  position: Position
  changePosition: (x: number, y: number) => void
}

const createExternalStore = (initProps: TocProps) => {
  return createStore<TocProps>()((set) => ({
    ...initProps,
  }))
}

type ExternalStore = ReturnType<typeof createExternalStore>

export const ExternalContext = createContext<ExternalStore | null>(null)

interface Props {
  setting: TocProps
}

export function App(props: Props) {
  const externalStore = useRef(createExternalStore(props.setting)).current

  return (
    <ExternalContext.Provider value={externalStore}>
      <FloatingToc />
    </ExternalContext.Provider>
  )
}
