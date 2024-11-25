/**
 * 密集型 setState 调用
 */
import Sun, { useState, useEffect } from '@/'

export function Parent1(props) {
	console.log('Component: Parent1', props)
	return (
		<section data-tagitem="parent">
			<strong>Parent1</strong>
			<Child1 parentId={111}>
				<div data-tagitem="child-inside">
					<em>Inside Child</em>
				</div>
			</Child1>
		</section>
	)
}

function Child1(props) {
	console.log('Component: Child1', props)
	return (
		<main data-tagitem="child">
			<span>Child1</span>
			{props.children}
		</main>
	)
}
