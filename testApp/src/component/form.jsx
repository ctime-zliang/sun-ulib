/**
 * 表单交互
 */
import Sun, { useState } from '@/'

export function FormInput1() {
	console.log('Component: FormInput1')
	const [value, setValue] = useState('initial value')
	const inputInputAction = e => {
		let inputValue = e.target.value
		// if (inputValue.length >= 15) {
		// 	inputValue = inputValue.substring(0, 15)
		// }
		setValue(e.target.value)
	}
	return (
		<section>
			<input value={value} onInput={inputInputAction} />
			<div>{value}</div>
		</section>
	)
}
