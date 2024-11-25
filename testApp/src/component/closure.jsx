/**
 * hooks 经典闭包案例
 */
import Sun, { useState, useEffect } from '@/'

export function TimeoutReadStateOnClosure() {
	console.log('Component: TimeoutReadStateOnClosure')
	const [count, setCount] = useState(0)
	const btnClickAction = () => {
		setCount(count + 1)
		window.setTimeout(() => {
			console.log(`show: count`)
			console.log(count)
		}, 3000)
	}
	return (
		<article>
			<button onClick={btnClickAction}>Set Count</button>
			<div>{count}</div>
		</article>
	)
}

export function IntervalSetCountOnClosure() {
	console.log('Component: IntervalSetCountOnClosure')
	const [count, setCount] = useState(0)
	useEffect(() => {
		window.setInterval(() => {
			console.log(`do: setCount`)
			setCount(count + 1)
			// setCount(count => count + 1)
		}, 500)
	}, [])
	return (
		<article>
			<div>{count}</div>
		</article>
	)
}
