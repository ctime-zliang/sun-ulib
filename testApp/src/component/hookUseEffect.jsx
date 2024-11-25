/**
 * useEffect 调用测试
 */
import Sun, { useState, useEffect } from '@/'

export function UseEffect1() {
	console.log(`Component: UseEffect1`)
	const [count, setCount] = useState(1)
	const setCountAction = () => {
		setCount(count + 1)
	}
	useEffect(() => {
		console.log(`===>>> useEffect: UseEffect1`)
		return () => {
			console.log(`--->>> useEffect.return-cb: UseEffect1`)
		}
	})
	return (
		<div>
			<button onClick={setCountAction}>Set Count</button>
			<div>{count}</div>
		</div>
	)
}

export function UseEffect2() {
	console.log(`Component: UseEffect2`)
	const [count, setCount] = useState(1)
	const setCountAction = () => {
		setCount(count + 1)
	}
	// useEffect(() => {
	// 	console.log(`===>>> useEffect: UseEffect2`)
	// })
	useEffect(() => {
		console.log(`===>>> useEffect: UseEffect2`)
	}, [])
	return (
		<div>
			<button onClick={setCountAction}>Set Count</button>
			<div>{count}</div>
			{count <= 1 ? <ChildComponent1 /> : null}
		</div>
	)
}

export function UseEffect3() {
	console.log(`Component: UseEffect3`)
	const [count, setCount] = useState(1)
	useEffect(() => {
		console.log(`===>>> useEffect: UseEffect3`)
		console.log(document.getElementById('useEffect3Element'))
	}, [])
	return (
		<div>
			<div id="useEffect3Element">{count}</div>
		</div>
	)
}

function ChildComponent1() {
	console.log(`Component: ChildComponent1`)
	useEffect(() => {
		console.log(`--->>> useEffect: ChildComponent1`)
		return () => {
			console.log(`--->>> useEffect.return-cb: ChildComponent1`)
		}
	}, [])
	return <div>ChildComponent 1</div>
}

export function UseEffectInfiniteLoop() {
	console.log(`Component: UseEffectInfiniteLoop`)
	const [count, setCount] = useState(1)
	useEffect(() => {
		setCount(count => {
			return count + 1
		})
		// setCount(count + 1)
	})
	return (
		<div>
			<div>{count}</div>
		</div>
	)
}
