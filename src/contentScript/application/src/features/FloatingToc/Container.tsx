import { useRef } from 'react'

import { type PanInfo, motion, useDragControls, useMotionValue, useTransform } from 'framer-motion'
import { MotionLayout } from './MotionLayout'
import { Toc } from './Toc'

import { Header } from './Header'
import { Layout } from './Layout'

import { SizeIcon } from '@radix-ui/react-icons'
import { Divider } from '../../components/Divider'
import { useExternalActions, useInitialPosition } from '../../store/external'
import { parseInitialPosition } from './toc.utils'

const Container = () => {
  const position = useInitialPosition()
  const { changePosition } = useExternalActions()

  const controls = useDragControls()

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    controls.start(e)
  }

  const widthMotionValue = useMotionValue(300)
  const heightMotionValue = useMotionValue(300)
  const width = useTransform(widthMotionValue, (latest) => latest)
  const height = useTransform(heightMotionValue, (latest) => latest)
  const constraints = {
    left: 0,
    top: 0,
    bottom: window.innerHeight - heightMotionValue.get(),
    right: document.documentElement.scrollWidth - widthMotionValue.get(),
  }
  const parsedInitialPosition = parseInitialPosition(position, constraints)
  const initialDims = useRef({
    width: widthMotionValue.get(),
    height: heightMotionValue.get(),
  })

  const onPanStart = (e: PointerEvent, info: PanInfo) => {
    e.stopPropagation()
    e.preventDefault()

    initialDims.current = {
      width: widthMotionValue.get(),
      height: heightMotionValue.get(),
    }
  }

  const onPan = (e: PointerEvent, info: PanInfo) => {
    e.stopPropagation()
    e.preventDefault()

    widthMotionValue.set(initialDims.current.width + info.offset.x)
    heightMotionValue.set(initialDims.current.height + info.offset.y)
  }

  const onPanEnd = (e: PointerEvent, info: PanInfo) => {
    initialDims.current = {
      width: widthMotionValue.get(),
      height: heightMotionValue.get(),
    }
  }

  return (
    <Layout>
      <MotionLayout
        constraints={constraints}
        controls={controls}
        tocSize={{
          width,
          height,
        }}
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
