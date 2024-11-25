import { TExtendHTMLDOMElment } from './dom.types'
import { TAllHooksStruct } from './hooks.types'
import { TVDOM } from './vdom.types'

export type TTASKQUEUE_ITEM = {
	count: number
}

export type TFiberRootNode = {
	current: TFiberNode
}

export type TFiberNode = {
	type: Function | string
	props: TVDOM | any
	// elementType: string
	stateNode: TExtendHTMLDOMElment
	child: TFiberNode
	parent: TFiberNode
	sibling: TFiberNode
	alternate: TFiberNode
	effectTag: string
	key: string
	dirty: boolean
	triggerUpdate: boolean
	hooks: Array<TAllHooksStruct>
	typeof: string
	effectCachedMounted: boolean
	layoutEffectCachedMounted: boolean
	effectCachedUnmounted: boolean
	/* ... */
	root?: boolean
	index?: number
	current?: TFiberNode
	queueUp?: boolean
}
