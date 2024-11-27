import { useDragControls, useMotionValue, useTransform } from 'framer-motion'
import { MotionLayout } from './MotionLayout'
import { Toc } from './Toc'

import { Header } from './Header'
import { Layout } from './Layout'

import { useEffect, useRef } from 'react'
import { Divider } from '../../components/Divider'
import { useExternalActions, useInitialPosition, useInitialSize } from '../../store/external'
import { Resizer } from './Resizer'
import type { Size } from './toc.type'
import { parseInitialPosition } from './toc.utils'

const Container = () => {
  const position = useInitialPosition()
  const size = useInitialSize()

  const { changePosition, changeSize } = useExternalActions()

  const controls = useDragControls()

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    controls.start(e)
  }

  const sizeMotionValue = useMotionValue({
    width: size.width,
    height: size.height,
  })

  const { current: constraints } = useRef({
    left: 0,
    top: 0,
    bottom: window.innerHeight - sizeMotionValue.get().height,
    right: document.documentElement.scrollWidth - sizeMotionValue.get().width,
  })

  const parsedInitialPosition = parseInitialPosition(position, constraints)

  useEffect(() => {
    const unSubscribeSize = sizeMotionValue.on('change', (value) => {
      constraints.right = document.documentElement.scrollWidth - value.width
      constraints.bottom = window.innerHeight - value.height

      changeSize((prev) => ({ ...value }))
    })

    return () => {
      unSubscribeSize()
    }
  }, [changeSize, sizeMotionValue])

  const handleResize = (size: Size) => {
    sizeMotionValue.set(size)
  }

  return (
    <Layout>
      <MotionLayout
        constraints={constraints}
        controls={controls}
        tocSize={sizeMotionValue}
        initialPosition={parsedInitialPosition}
        onDragEnd={changePosition}
      >
        <Header onPointerDown={handlePointerDown} />

        <Divider />

        <Toc />

        <Resizer
          size={{
            width: sizeMotionValue.get().width,
            height: sizeMotionValue.get().height,
          }}
          onResize={handleResize}
        />
      </MotionLayout>
    </Layout>
  )
}

export default Container
