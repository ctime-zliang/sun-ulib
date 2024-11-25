/**
 * setState 调用测试
 */
import Sun, { useState } from '@/'

export function UseState1() {
	console.log(`Component: UseState1`)
	const [count, setCount] = useState(1)
	const setCountAction = () => {
		setCount(value => {
			return value + 1
		})
	}
	return (
		<div>
			<button onClick={setCountAction}>Set Count</button>
			<div>{count}</div>
		</div>
	)
}
