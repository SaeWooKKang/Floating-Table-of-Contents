import { useReducer, useRef } from 'react'

import { useDragControls } from 'framer-motion'
import { MotionLayout } from './MotionLayout'
import { Toc } from './Toc'

import { Header } from './Header'
import { Layout } from './Layout'

import { Divider } from '../../components/Divider'
import { TOC_INITIAL_STATE, tocReducer } from './toc.reducer'

const Container = () => {
  const [toc, dispatch] = useReducer(tocReducer, TOC_INITIAL_STATE)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const controls = useDragControls()

  const showBigger = toc.type === 'bigger'

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    controls.start(e)
  }

  const handleTap = () => {
    dispatch({ type: showBigger ? 'smaller' : 'bigger' })
  }

  return (
    <Layout ref={constraintsRef}>
      <MotionLayout constraints={constraintsRef} controls={controls} tocSize={toc.size}>
        <Header onPointerDown={handlePointerDown} showBigger={showBigger} />

        <Divider />

        <Toc onTap={handleTap} showBigger={showBigger} />
      </MotionLayout>
    </Layout>
  )
}

export default Container
