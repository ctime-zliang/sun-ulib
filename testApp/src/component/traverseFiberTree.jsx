/**
 *	Fiber 树遍历案例
 */
import Sun, { useState } from '@/'

export function TraverseFiberTree() {
	console.log(`Component: TraverseFiberTree`)
	const [fontSize, setFontSize] = useState(12)
	const [status, setStatus] = useState(false)
	const modifyFontSize = () => {
		setFontSize(fontSize => {
			return fontSize + 1
		})
	}
	return (
		<ul style={{ border: '1px solid red' }}>
			{/* <li data-tag="li-1">
				Li 1 - {status} - {fontSize}
			</li> */}
			<li data-tag="li-1">{status}</li>
			<li data-tag="li-2" onClick={modifyFontSize}>
				<main>Li 2 div 1</main>
				<section>Li 2 div 2 - {fontSize}</section>
			</li>
			<li data-tag="li-3">Li 3</li>
		</ul>
	)
}
