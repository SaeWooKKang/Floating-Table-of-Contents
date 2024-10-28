import './index.css'

import type { External } from '../type'
import FloatingToc from './features/FloatingToc'
import { ExternalProvider } from './store/external'

export interface Props {
  setting: External
}

export function App(props: Props) {
  return (
    <ExternalProvider {...props.setting}>
      <FloatingToc />
    </ExternalProvider>
  )
}
