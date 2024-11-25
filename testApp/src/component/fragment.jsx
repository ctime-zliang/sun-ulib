/**
 * Fragment Element
 */
import Sun, { useState, Fragment } from '@/'

export function FragmentElement1() {
	console.log(`Component: FragmentElement1`)
	const [number, setNumber] = useState(0)
	const setNumberAction = () => {
		setNumber(number => {
			return number + 1
		})
	}
	return (
		<section>
			<button onClick={setNumberAction}>Set Number({number})</button>
			<div>
				{number < 1 ? <GroupFragmentChildA /> : <GroupFragmentChildB />}
				<OneFunctionComponent />
				<h3 style={{ color: number < 1 ? 'yellow' : 'red' }}>H3 Content</h3>
			</div>
		</section>
	)
}

function OneFunctionComponent() {
	console.log(`Component: OneFunctionComponent`)
	return <h2>OneFunctionComponent</h2>
}

function GroupFragmentChildA() {
	console.log(`Component: FragmentChildA`)
	return (
		<>
			<FragmentChild11 />
			<>
				<div>
					<em>- Repeat</em>
				</div>
			</>
			<FragmentChild11 />
		</>
	)
}

function FragmentChild11() {
	console.log(`Component: FragmentChild11`)
	return (
		<>
			<section style={{ color: 'red' }}>FragmentChild1 - 1</section>
			<section style={{ color: 'red' }}>
				<>FragmentChild1 - 2</>
			</section>
			<>
				<section style={{ color: 'red' }}>FragmentChild1 - 3</section>
			</>
			<>FragmentChild1 - 4</>
			<>
				<span style={{ color: 'red' }}>FragmentChild1 - 5</span>
			</>
		</>
	)
}

function GroupFragmentChildB() {
	console.log(`Component: FragmentChildB`)
	return (
		<>
			<FragmentChild21 />
			<>
				<div>
					<em>- Repeat</em>
				</div>
			</>
			<FragmentChild21 />
		</>
	)
}

function FragmentChild21() {
	console.log(`Component: FragmentChild21`)
	return (
		<>
			<article style={{ color: 'blue' }}>FragmentChild2 - 1</article>
			<article style={{ color: 'blue' }}>FragmentChild2 - 2</article>
		</>
	)
}
