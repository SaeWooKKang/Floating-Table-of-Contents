import { useReducer, useRef } from 'react'

import { type PanInfo, motion, useDragControls, useMotionValue, useTransform } from 'framer-motion'
import { MotionLayout } from './MotionLayout'
import { Toc } from './Toc'

import { Header } from './Header'
import { Layout } from './Layout'

import { SizeIcon } from '@radix-ui/react-icons'
import { Divider } from '../../components/Divider'
import { useExternalActions, useInitialPosition } from '../../store/external'
import { TOC_INITIAL_STATE, tocReducer } from './toc.reducer'
import { parseInitialPosition } from './toc.utils'

const Container = () => {
  const [toc, dispatch] = useReducer(tocReducer, TOC_INITIAL_STATE)
  const constraints = {
    left: 0,
    top: 0,
    bottom: window.innerHeight - toc.size.height,
    right: document.documentElement.scrollWidth - toc.size.width,
  }

  const position = useInitialPosition()
  const { changePosition } = useExternalActions()

  const controls = useDragControls()

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    controls.start(e)
  }

  const handleResize = (p: { width: number; height: number }) => {
    dispatch({ type: 'resize', payload: { height: p.height, width: p.width } })
  }

  const parsedInitialPosition = parseInitialPosition(position, constraints)

  const widthMotionValue = useMotionValue(toc.size.width)
  const heightMotionValue = useMotionValue(toc.size.height)
  const width = useTransform(widthMotionValue, (latest) => latest)
  const height = useTransform(heightMotionValue, (latest) => latest)

  const initialDims = useRef({
    width: widthMotionValue.get(),
    height: heightMotionValue.get(),
    isResizing: false,
  })

  const onPanStart = (e: PointerEvent, info: PanInfo) => {
    e.stopPropagation()
    e.preventDefault()
    initialDims.current = {
      width: widthMotionValue.get(),
      height: heightMotionValue.get(),
      isResizing: true,
    }
  }

  const onPan = (e: PointerEvent, info: PanInfo) => {
    e.stopPropagation()
    e.preventDefault()
    widthMotionValue.set(initialDims.current.width + info.offset.x)
    heightMotionValue.set(initialDims.current.height + info.offset.y)

    handleResize({ width: width.get(), height: height.get() })
  }

  const onPanEnd = (e: PointerEvent, info: PanInfo) => {
    initialDims.current = {
      width: widthMotionValue.get(),
      height: heightMotionValue.get(),
      isResizing: true,
    }
  }

  return (
    <Layout>
      <MotionLayout
        constraints={constraints}
        controls={controls}
        tocSize={toc.size}
        initialPosition={parsedInitialPosition}
        onDragEnd={changePosition}
      >
        <Header onPointerDown={handlePointerDown} />

        <Divider />

        <Toc />

        <div className="sticky right-2 bottom-2 flex justify-end pr-[10px]">
          <motion.button
            onPan={onPan}
            onPanStart={onPanStart}
            onPanEnd={onPanEnd}
            className="rotate-90 rounded-md border-2 border-rose-200 p-1"
          >
            <SizeIcon />
          </motion.button>
        </div>
      </MotionLayout>
    </Layout>
  )
}

export default Container
