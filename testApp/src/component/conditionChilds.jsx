/**
 * 按条件增删元素
 *      增删子组件
 *      增删子元素
 */
import Sun, { useState } from '@/'

export function ConditionParent1() {
	console.log(`Component: ConditionParent1`)
	const [number, setNumber] = useState(0)
	const setNumberAction = () => {
		setNumber(number => {
			return number + 1
		})
	}
	return (
		<main>
			<button onClick={setNumberAction}>Set Number({number})</button>
			{number < 1 ? <ConditionChild1 /> : <ConditionChild2 />}
			<OneFunctionComponent />
			<h3>H3 Content</h3>
		</main>
	)
}

function OneFunctionComponent() {
	console.log(`Component: OneFunctionComponent`)
	return <h2>OneFunctionComponent</h2>
}

function ConditionChild1() {
	console.log(`Component: ConditionChild1`)
	return <section>ConditionChild1</section>
}

function ConditionChild2() {
	console.log(`Component: ConditionChild2`)
	return <article>ConditionChild2</article>
}

/***************************************************************************/
/***************************************************************************/
/***************************************************************************/

export function ConditionParentG1() {
	console.log(`Component: ConditionParentG1`)
	const [number, setNumber] = useState(0)
	const setNumberAction = () => {
		setNumber(number => {
			return number + 1
		})
	}
	return (
		<main>
			<button onClick={setNumberAction}>Set Number({number})</button>
			{number < 1 ? <section>ConditionChild1</section> : <section>ConditionChild2</section>}
			<h3>ConditionParentG1 CONTENT</h3>
		</main>
	)
}

export function ConditionParentG2() {
	console.log(`Component: ConditionParentG2`)
	const [number, setNumber] = useState(0)
	const setNumberAction = () => {
		setNumber(number => {
			return number + 1
		})
	}
	return (
		<main>
			<button onClick={setNumberAction}>Set Number({number})</button>
			{number < 1 ? (
				<section>ConditionChild1</section>
			) : (
				<section>
					<strong>ConditionChild2</strong>
				</section>
			)}
			<h3>ConditionParentG2 CONTENT</h3>
		</main>
	)
}

export function ConditionParentG3() {
	console.log(`Component: ConditionParentG3`)
	const [number, setNumber] = useState(0)
	const setNumberAction = () => {
		setNumber(number => {
			return number + 1
		})
	}
	return (
		<main>
			<button onClick={setNumberAction}>Set Number({number})</button>
			{number < 1 ? <section>ConditionChild1</section> : <article>ConditionChild2</article>}
			<h3>ConditionParentG3 CONTENT</h3>
		</main>
	)
}

export function ConditionParentG4() {
	console.log(`Component: ConditionParentG4`)
	const [number, setNumber] = useState(0)
	const setNumberAction = () => {
		setNumber(number => {
			return number + 1
		})
	}
	return (
		<main>
			<button onClick={setNumberAction}>Set Number({number})</button>
			{number < 1 ? (
				<section>ConditionChild1</section>
			) : (
				<article>
					<strong>ConditionChild2</strong>
				</article>
			)}
			<h3>ConditionParentG4 CONTENT</h3>
		</main>
	)
}

const FC = () => {
	return <span></span>
}
