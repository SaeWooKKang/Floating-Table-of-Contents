import { motion } from 'framer-motion'
import React, { useState } from 'react'

interface Props {
	onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void
	showBigger: boolean
}
export const Header = (props: Props) => {
	const [isGrabbing, setIsGrabbing] = useState(false)

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		setIsGrabbing(true)
		props.onPointerDown(e)
	}

	const handlePointerUp = () => {
		setIsGrabbing(false)
	}

	return (
		<motion.div
			layout
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			className="!bg-white flex justify-center flex-col"
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				cursor: isGrabbing ? 'grabbing' : 'grab',
				height: '55px',
			}}
		>
			<h1
				id="toc-title"
				style={{
					padding: '15px 10px',
					position: 'relative',
					fontSize: props.showBigger ? '16px' : '13px',
				}}
			>
				<span
					style={{ position: 'absolute', left: -15, display: props.showBigger ? 'block' : 'none' }}
				>
					☁️
				</span>
				<span style={{ fontWeight: 'bold' }}>Floating Table of Contents</span>
			</h1>

			<div
				style={{
					height: '0.5px',
					width: 'calc(100% - 20px)',
					backgroundColor: '#D5D5D5',
				}}
			/>
		</motion.div>
	)
}
