import Sun, { useState, useEffect, useRef, useCallback } from '@/'
import { formatDates } from '../../utils/utils'

const RATIO = 1.75

const clockContainerStyle = {
	display: `flex`,
	justifyContent: `center`,
	alignItems: `center`,
	alignContent: `center`,
	width: `250px`,
	height: `60px`,
	opacity: 0,
	transformOrigin: `center center`,
}
const clockWrapperStyle = {
	width: `100%`,
	height: `100%`,
	transformOrigin: `center center`,
}
const clockContentStyle = {
	color: `#444444`,
	fontSize: `20px`,
	fontWeight: 900,
	whiteSpace: `nowrap`,
	display: `flex`,
	justifyContent: `center`,
	alignItems: `center`,
	alignContent: `center`,
	width: `100%`,
	height: `100%`,
}
const leftAreaStyle = {
	width: `47%`,
	height: `100%`,
	display: `flex`,
	flexDirection: 'column',
	justifyContent: `center`,
	alignItems: `center`,
	alignContent: `center`,
}
const tipsShowStyle = {
	transform: `scaleX(1.07)`,
}
const splitUnderlineStyle = {
	width: `100%`,
	height: `3px`,
	backgroundColor: `#333333`,
}
const dateShowStyle = {
	fontSize: `0.75em`,
	transform: `scaleX(1.38)`,
}
const rightAreaStyle = {
	width: `53%`,
	height: `100%`,
	display: `flex`,
	flexDirection: 'column',
	justifyContent: `center`,
	alignItems: `center`,
	alignContent: `center`,
}
const timeShowStyle = {
	transform: `scaleY(2.58) scaleX(1.45)`,
}

let timer = null

export function DigitalClock(props) {
	console.log('Component: DigitalClock')
	const [dateValue, setDateValue] = useState(`0000-00-00`)
	const [timeValue, setTimeValue] = useState(`00:00:00`)
	const containerRef = useRef(null)
	const resizeHandler = useCallback(() => {
		if (containerRef.current) {
			const viewClientWidth = document.documentElement.clientWidth
			const viewClientHeight = document.documentElement.clientHeight
			const scale = (viewClientHeight / 1000) * RATIO
			containerRef.current.style.opacity = `1`
			containerRef.current.style.transform = `scale(${scale}) translate3d(0, ${(viewClientHeight * 0.3) / scale}px, 5px)`
		}
	}, [])
	useEffect(() => {
		timer = window.setInterval(() => {
			const v = formatDates().split(' ')
			setDateValue(v[0])
			setTimeValue(v[1])
		})
		resizeHandler()
		window.addEventListener('resize', resizeHandler)
		return () => {
			window.clearInterval(timer)
			window.removeEventListener('resize', resizeHandler)
		}
	}, [])
	return (
		<div ref={containerRef} className="clock-container" style={clockContainerStyle}>
			<div className="clock-wrapper" style={clockWrapperStyle}>
				<div className="clock-content" style={clockContentStyle}>
					<div className="left-area" style={leftAreaStyle}>
						<div className="tips-show" style={tipsShowStyle}>
							<span>NOW TIME</span>
						</div>
						<div className="split-underline" style={splitUnderlineStyle}></div>
						<div className="date-show" style={dateShowStyle}>
							<span>{dateValue}</span>
						</div>
					</div>
					<div className="right-area" style={rightAreaStyle}>
						<div className="time-show" style={timeShowStyle}>
							<span>{timeValue}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
