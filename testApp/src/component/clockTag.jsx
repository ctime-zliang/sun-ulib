/**
 * 密集型 setState 调用
 */
import Sun, { useState, useEffect } from '@/'
import { formatDates } from '../utils/utils'

let intervalNumber = 1
let clockTimer = null
export function ClockTag() {
	console.log('Component: ClockTag')
	const [clockCount, setClockCount] = useState('xxxx-xx-xx --:--:--')
	const [tagList, setTagList] = useState([])
	const btnClickAtion = () => {
		setTagList(tagList => {
			const allList = [...tagList, clockCount]
			if (allList.length > 10) {
				allList.length = 0
				allList.push(clockCount)
			}
			return allList
		})
	}
	useEffect(() => {
		clockTimer = window.setInterval(() => {
			setClockCount(formatDates())
		}, intervalNumber)
		return () => {
			window.clearInterval(clockTimer)
		}
	}, [])
	return (
		<article data-tagitem="clock">
			<div>{clockCount} - ClockTag</div>
			<button onClick={btnClickAtion}>Set Tag(s)</button>
			<ul>
				{tagList.map((item, index) => {
					return (
						<li>
							{index} - {item}
						</li>
					)
				})}
			</ul>
		</article>
	)
}
