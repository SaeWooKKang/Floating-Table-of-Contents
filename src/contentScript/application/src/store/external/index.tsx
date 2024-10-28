import { type PropsWithChildren, createContext, useContext, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import type { External } from '../../../type'

type ExternalStore = ReturnType<typeof createExternalStore>

const createExternalStore = (initProps: External) => {
  return createStore<External>()((set) => ({
    ...initProps,
  }))
}

const ExternalContext = createContext<ExternalStore | null>(null)

type TocProviderProps = PropsWithChildren<External>

export const ExternalProvider = ({ children, ...props }: TocProviderProps) => {
  const externalStoreRef = useRef<ExternalStore>()

  if (!externalStoreRef.current) {
    externalStoreRef.current = createExternalStore(props)
  }

  return (
    <ExternalContext.Provider value={externalStoreRef.current}>{children}</ExternalContext.Provider>
  )
}

const useExternalContext = <T,>(selector: (state: External) => T): T => {
  const store = useContext(ExternalContext)

  if (!store) throw new Error('Missing ExternalContext.Provider in the tree')

  return useStore(store, selector)
}

export const useInitialPosition = () => {
  return useExternalContext(({ position }) => position)
}

export const useExternalActions = () => {
  return useExternalContext(({ action }) => action)
}
