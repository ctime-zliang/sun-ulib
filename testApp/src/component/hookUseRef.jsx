/**
 * useRef 调用测试
 */
import Sun, { useState, useEffect, useRef } from '@/'

export function UseRef1() {
	console.log('Component: UseRef1')
	const [count, setCount] = useState(0)
	const ref = useRef(null)
	ref.current = count
	useEffect(() => {
		window.setInterval(() => {
			setCount(ref.current + 1)
		}, 500)
	}, [])
	return (
		<article>
			<div>{count}</div>
		</article>
	)
}

export function UseRef2() {
	console.log('Component: UseRef2')
	const ref = useRef(null)
	const clickAction = () => {
		console.log(ref.current)
	}
	return (
		<article>
			<button ref={ref} onClick={clickAction}>
				Check Ref Current
			</button>
		</article>
	)
}

export function UseRef3() {
	console.log('Component: UseRef3')
	const ref = useRef(null)
	const [number, setNumber] = useState(0)
	const clickAction = () => {
		setNumber(number + 1)
		console.log(ref)
	}
	return (
		<article>
			<button onClick={clickAction}>Set Number({number})</button>
			{number <= 3 ? <div ref={ref}>Number 小于等于 3</div> : <section ref={ref}>Number 大于 3</section>}
		</article>
	)
}
