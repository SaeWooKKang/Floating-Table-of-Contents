import { motionValue, useDragControls, useMotionValue, useTransform } from 'framer-motion'
import { MotionLayout } from './MotionLayout'
import { Toc } from './Toc'

import { Header } from './Header'
import { Layout } from './Layout'

import { useEffect, useRef } from 'react'
import { Divider } from '../../components/Divider'
import { useExternalActions, useInitialPosition, useInitialSize } from '../../store/external'
import { Resizer } from './Resizer'
import { parseInitialPosition } from './toc.utils'

const Container = () => {
  const position = useInitialPosition()
  const size = useInitialSize()

  const { changePosition, changeSize } = useExternalActions()

  const controls = useDragControls()

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    controls.start(e)
  }

  const widthMotionValue = useMotionValue(size.width)
  const heightMotionValue = useMotionValue(size.height)

  const { current: constraints } = useRef({
    left: 0,
    top: 0,
    bottom: window.innerHeight - heightMotionValue.get(),
    right: document.documentElement.scrollWidth - widthMotionValue.get(),
  })

  const parsedInitialPosition = parseInitialPosition(position, constraints)

  useEffect(() => {
    const unSubscribeWidth = widthMotionValue.on('change', (value) => {
      constraints.right = document.documentElement.scrollWidth - value
      changeSize((prev) => ({ ...prev, width: value }))
    })

    const unSubscribeHeight = heightMotionValue.on('change', (value) => {
      constraints.bottom = window.innerHeight - value
      changeSize((prev) => ({ ...prev, height: value }))
    })

    return () => {
      unSubscribeWidth()
      unSubscribeHeight()
    }
  }, [widthMotionValue, heightMotionValue, changeSize])

  return (
    <Layout>
      <MotionLayout
        constraints={constraints}
        controls={controls}
        tocSize={{
          width: widthMotionValue,
          height: heightMotionValue,
        }}
        initialPosition={parsedInitialPosition}
        onDragEnd={changePosition}
      >
        <Header onPointerDown={handlePointerDown} />

        <Divider />

        <Toc />

        <Resizer width={widthMotionValue} height={heightMotionValue} />
      </MotionLayout>
    </Layout>
  )
}

export default Container
