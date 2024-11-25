import Sun, { useCallback, useEffect, useRef } from '@/'
import { ClockCanvas } from '../../utils/ClockCanvas'

const BETWEEN_HEIGHT = 100
const RATIO = 0.65

const clockContainerStyle = {
	position: `absolute`,
	display: `flex`,
	justifyContent: `center`,
	alignItems: `center`,
	alignContent: `center`,
	width: `100%`,
	height: `100%`,
}

export function MechanicalClock() {
	console.log('Component: MechanicalClock')
	const clockReference = useRef(null)
	const canvsElementReference = useRef(null)
	const canvsWrapperReference = useRef(null)
	const initClock = () => {
		clockReference.current = new ClockCanvas(canvsElementReference.current)
	}
	const resizeHandler = useCallback(e => {
		const viewClientWidth = document.documentElement.clientWidth
		const viewClientHeight = document.documentElement.clientHeight
		const areaHeight = viewClientHeight - BETWEEN_HEIGHT
		canvsWrapperReference.current.style.transform = `translate3d(0, ${-1 * viewClientHeight * 0.08}px, 5px)`
		if (clockReference.current) {
			clockReference.current.stop()
			clockReference.current.setCanvasRect(areaHeight * RATIO, areaHeight * RATIO)
			clockReference.current.start()
		}
	}, [])
	useEffect(() => {
		initClock()
		resizeHandler()
		window.addEventListener('resize', resizeHandler)
		return () => {
			if (clockReference.current) {
				clockReference.current.stop()
			}
			window.removeEventListener('resize', resizeHandler)
		}
	}, [])
	return (
		<div style={clockContainerStyle}>
			<div ref={canvsWrapperReference}>
				<canvas ref={canvsElementReference} width={0} height={0}></canvas>
			</div>
		</div>
	)
}
