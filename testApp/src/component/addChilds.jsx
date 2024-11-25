/**
 * 动态覆写更新子节点列表
 * 		逐一追加子节点
 * 		批量覆写更新过量子节点
 */
import Sun, { useState } from '@/'

let childLength1 = 0
export function DynamicallyAddChilds1() {
	console.log(`Component: DynamicallyAddChilds1`)
	const [list, setList] = useState([])
	const modifyList = () => {
		const array = []
		childLength1++
		for (let i = 0; i < childLength1; i++) {
			array.push(i + 1)
		}
		setList(array)
	}
	return (
		<div className="row-view">
			<button onClick={modifyList}>Children Length: {list.length}</button>
			<main>
				{list.map((item, index) => {
					return <div>List {item}</div>
				})}
			</main>
		</div>
	)
}

let childLength2 = 0
export function DynamicallyAddChilds2() {
	console.log(`Component: DynamicallyAddChilds2`)
	const [list, setList] = useState([])
	const modifyList = () => {
		const array = []
		childLength2++
		for (let i = 0; i < 30000; i++) {
			array.push(i + 1)
		}
		setList(array)
	}
	return (
		<div className="row-view">
			<button onClick={modifyList}>Children Length: {list.length}</button>
			<main>
				{list.map((item, index) => {
					return (
						<div>
							List {item} - {childLength2}
						</div>
					)
				})}
			</main>
		</div>
	)
}
