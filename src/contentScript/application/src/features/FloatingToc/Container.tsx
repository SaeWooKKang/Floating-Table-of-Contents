import React, { useReducer } from 'react'

import { useDragControls } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MotionLayout } from './MotionLayout'
import { Layout } from './Layout'
import { Header } from './Header'
import { Toc } from './Toc'

import { TOC_INITIAL_STATE, tocReducer } from './toc.reducer'

const Container = () => {
	const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 })
	const [toc, dispatch] = useReducer(tocReducer, TOC_INITIAL_STATE)

	const showBigger = toc.type === 'bigger'

	const controls = useDragControls()

	useEffect(() => {
		setConstraints((prev) => ({
			...prev,
			bottom: window.innerHeight - toc.size.height,
			right: document.documentElement.scrollWidth - toc.size.width,
		}))
	}, [toc])

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		controls.start(e)
	}

	const handleTap = () => {
		dispatch({ type: showBigger ? 'smaller' : 'bigger' })
	}

	return (
		<Layout>
			<MotionLayout constraints={constraints} controls={controls} tocSize={toc.size}>
				<Header onPointerDown={handlePointerDown} showBigger={showBigger} />

				<Toc onTap={handleTap} showBigger={showBigger} />
			</MotionLayout>
		</Layout>
	)
}

export default Container
