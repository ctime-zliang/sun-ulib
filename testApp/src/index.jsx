import frameCountPerSecond from './modules/frameCountPerSecond'
import { setIntervalAnimateMain } from './modules/setIntervalAnimate'
import { updateInnerContentMain } from './modules/updateElementInnerContent'
import { setDocumentBackgroudColor } from './modules/setDocumentBackgroudColor'
/* ... */
import Sun, { render, createRoot } from '../../src'
/* ... */
import { ClockView } from './component/clock'
/* ... */
import { DynamicallyAddChilds1, DynamicallyAddChilds2 } from './component/addChilds'
import { MemoParent1, MemoChild1, MemoChild1Memo } from './component/memo'
import { TraverseFiberTree } from './component/traverseFiberTree'
import { TimeoutReadStateOnClosure, IntervalSetCountOnClosure } from './component/closure'
import { FormInput1 } from './component/form'
import { UseCallback1 } from './component/hookUseCallback'
import { UseMemo1 } from './component/hookUseMemo'
import { UseRef1, UseRef2, UseRef3 } from './component/hookUseRef'
import { UseEffectExecOnComponentTree } from './component/hookUseEffectExecOnComponentTree'
import { ClockTag } from './component/clockTag'
import { FragmentElement1 } from './component/fragment'
import { ConditionParent1, ConditionParentG1, ConditionParentG2, ConditionParentG3, ConditionParentG4 } from './component/conditionChilds'
import { UseState1 } from './component/hookUseState'
import { UseEffectInfiniteLoop, UseEffect1, UseEffect2, UseEffect3 } from './component/hookUseEffect'
import { Parent1 } from './component/childrenSlot'

function App() {
	console.log(`Component: App`)
	const [helloText] = Sun.useState('Hello Sun Application')
	const [count1, setCount1] = Sun.useState(0)
	const [count2, setCount2] = Sun.useState(0)
	const clickAction1 = () => {
		setCount1(count1 + 1)
	}
	const clickAction2 = () => {
		setCount2(prev => {
			return prev + 2
		})
	}
	return (
		<div className="row-index" style={{ border: '1px solid red' }}>
			<section>
				<button onClick={clickAction1}>Set Count 1</button>
				<span>Now Count 1: {count1}</span>
			</section>
			<section>
				<button onClick={clickAction2}>Set Count 2</button>
				<span>Now Count 2: {count2}</span>
			</section>
			<div>{helloText}</div>
		</div>
	)
}

// Sun.setSyncMode()
/************************************************/
/************************************************/
/************************************************/
render(<ClockView rootId={Math.random()} />, document.querySelector(`#clockApp`))
// createRoot(document.querySelector(`#app1`)).render(<DynamicallyAddChilds2 />)
// createRoot(document.querySelector(`#app2`)).render(<App />)
/************************************************/
/************************************************/
/************************************************/

window.addEventListener('DOMContentLoaded', function (e) {
	// setIntervalAnimateMain()
	// updateInnerContentMain()
	setDocumentBackgroudColor(`rgba(235, 235, 235, 0.5)`)
})
