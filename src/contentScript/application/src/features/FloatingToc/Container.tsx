import { useDragControls, useMotionValue, useTransform } from 'framer-motion'
import { MotionLayout } from './MotionLayout'
import { Toc } from './Toc'

import { Header } from './Header'
import { Layout } from './Layout'

import { Divider } from '../../components/Divider'
import { useExternalActions, useInitialPosition } from '../../store/external'
import { Resizer } from './Resizer'
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

        <Resizer width={widthMotionValue} height={heightMotionValue} />
      </MotionLayout>
    </Layout>
  )
}

export default Container
