import { TVDOM } from '../types/vdom.types'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'
import { TEffectStruct, TUseEffectHookStruct } from 'src/types/hooks.types'
import { __RTP__ } from '../core/runtime'
import { HTMLELEMENT_NODETYPE } from '../config/commitDom.enum'

/**
 * @description 创建初始 vDom 结构体数据
 * @function createInitialVDOMStructData
 * @param {string} type HTML DOM tagName
 * @param {object} props HTML DOM vDom 定义属性
 * @return {TVDOM}
 */
export function createInitialVDOMStructData(type: string, props: PlainObject): TVDOM {
	return {
		type,
		props,
		$$typeof: props.$$typeof,
	}
}

/**
 * @description 创建初始 Fiber 结构体数据
 * @function createInitialFiberStructData
 * @return {TFiberNode}
 */
export function createInitialFiberStructData(): TFiberNode {
	return {
		/* 
			FunctionComponent = 函数本身
			ClassComponent = class
			HostComponent = DOM节点 tagName 
		*/
		// 标记当前 Fiber 节点的类型
		// 对于 FunctionComponent, 即函数本身
		// 对于 ClassComponent, 即 class
		// 对于 HostComponent, 指 DOM 节点 tagName
		// 此项对应 React Fiber 设计中的 fiber.type
		type: null!,
		// fiber 节点的 vDom 属性
		props: {},
		// 标记当前 Fiber 节点对应的 DOM 节点类型
		// elementType: undefined,
		// 当前 Fiber 节点对应的真实 DOM
		stateNode: null!,
		// fiber 节点的第一个子节点 fiber
		child: null!,
		// fiber 节点的返回节点(父节点)
		parent: null!,
		// fiber 节点的下一个兄弟节点
		sibling: null!,
		// 当前 fiber 节点在更新前的上一轮 fiber 节点对象
		alternate: null!,
		// fiber 节点的更新状态
		effectTag: ENUM_EFFECT_TAG.NO_EFFECT,
		// 索引键
		key: (void 0)!,
		// hooks
		hooks: [],
		// vdom 类型标记位
		typeof: ``,
		// 是否需要更新 fiber 节点
		dirty: false,
		// 触发更新的标记位
		triggerUpdate: false,
		effectCachedMounted: false,
		layoutEffectCachedMounted: false,
		effectCachedUnmounted: false,
	}
}

/**
 * @description 创建适用于非根节点的 Fiber 结构体数据
 * @function createFiberStructData
 * @param {any} args 满足 TFiberNode 节点的配置项
 * @return {TFiberNode}
 */
export function createFiberStructData(args: any = {}): TFiberNode {
	const defaults: TFiberNode = createInitialFiberStructData()
	return {
		...defaults,
		...args,
	}
}

/**
 * @description 获取根 Fiber 节点
 * @function getRootFiber
 * @param {TFiberNode} fiber fiber 节点
 * @return {TFiberNode}
 */
export function getRootFiber(fiber: TFiberNode): TFiberNode {
	let rootFiber: TFiberNode = fiber
	while (!rootFiber.root) {
		rootFiber = rootFiber.parent as TFiberNode
	}
	return rootFiber
}

/**
 * @description 获取当前函数组件 fiber 的最近的具有真实 DOM 句柄的父 fiber 节点
 * 		fiber 节点对应函数节点时, 执行 while 循环
 * 		fiber 节点对应 Host 节点时, 自动跳过 while 循环
 * @function getNearestParentFiberWithHoldDom
 * @param {TFiberNode} fiber fiber 节点
 * @return {TFiberNode}
 */
export function getNearestParentFiberWithHoldDom(parentFiber: TFiberNode): TFiberNode {
	while (parentFiber && !parentFiber.stateNode) {
		parentFiber = parentFiber.parent as TFiberNode
	}
	return parentFiber
}

/**
 * @description 获取当前函数组件 fiber 的最近的具有真实 DOM 句柄的子 fiber 节点
 * 		fiber 节点对应函数节点时, 执行 while 循环
 * 		fiber 节点对应 Host 节点时, 自动跳过 while 循环
 * @function getNearestChildFiberWithHoldDom
 * @param {TFiberNode} fiber fiber 节点
 * @return {TFiberNode}
 */
export function getNearestChildFiberWithHoldDom(childFiber: TFiberNode): TFiberNode {
	while (childFiber && (!childFiber.stateNode || String(childFiber.stateNode.nodeType) === HTMLELEMENT_NODETYPE.DOCUMENT_FRAGMENT_NODE)) {
		childFiber = childFiber.child as TFiberNode
	}
	return childFiber
}

/**
 * @description 判断是否是新的属性
 * @function isNewly
 * @param {any} oldObj 旧节点属性
 * @param {any} newObj 新节点属性
 * @return {function}
 */
export function isNewly(oldObj: PlainObject, newObj: PlainObject): (key: string) => boolean {
	return (key: string): boolean => {
		return oldObj[key] !== newObj[key]
	}
}

/**
 * @description 判断是否是旧的属性
 * @function isOld
 * @param {any} oldObj 旧节点属性
 * @param {any} newObj 新节点属性
 * @return {function}
 */
export function isOld(oldObj: PlainObject, newObj: PlainObject): (key: string) => boolean {
	return (key: string): boolean => {
		return !(key in newObj)
	}
}

/**
 * @description 判断是否存在属性
 * @function hasProperty
 * @param {any} obj 查询对
 * @param {string} key 查询键
 * @return {function}
 */
export function hasProperty(obj: { [key: string]: any }, key: string): boolean {
	return key in obj
}

/**
 * @description 判断是否是 HTML 属性
 * @function isProperty
 * @param {string} key 属性名称
 * @return {boolean}
 */
export function isProperty(key: string): boolean {
	return !['children'].includes(key) && !(key[0] === 'o' && key[1] === 'n')
}

/**
 * @description 判断是否是 HTML 系统事件
 * @function isSystemEvent
 * @param {string} key 属性名称
 * @return {boolean}
 */
export function isSystemEvent(key: string): boolean {
	return key[0] === 'o' && key[1] === 'n'
}

/**
 * @description 判断是否是正常的 Fiber 节点
 * @function isApprovedComponent
 * @param {TFiberNode} fiber fiber 节点
 * @return {boolean}
 */
export function isApprovedComponent(fiber: TFiberNode): boolean {
	return fiber.type != null || typeof fiber.type != 'undefined'
}

/**
 * @description 判断是否是函数组件
 * @function isFunctionComponent
 * @param {TFiberNode} fiber fiber 节点
 * @return {boolean}
 */
export function isFunctionComponent(fiber: TFiberNode | TVDOM): boolean {
	return !!(fiber.type && fiber.type instanceof Function && typeof (fiber.type as any)['__@@INSIDE_FRAGMENT_ANCHOR'] === 'undefined')
}

/**
 * @description 数组扁平化
 * @function flatArray
 * @param {array} arr 需要扁平化的数组(通常是嵌套数组)
 * @return {array}
 */
export function flatArray(arr: Array<any>, res: Array<any> = []): Array<any> {
	res = res || []
	for (let i: number = 0; i < arr.length; i++) {
		const a: any = arr[i]
		if (Array.isArray(a)) {
			flatArray(a, res)
			continue
		}
		res.push(a)
	}
	return res
}

/**
 * @description 检测组件属性是否发生变更
 * 		对于原始类型, 会对比其值变更
 * 		对于引用类型, 会对比其引用地址
 * @function checkComponentPropsChanged
 * @param {TFiberNode} fiber 函数组件所对应的 fiber 节点
 * @return {boolean}
 */
export function checkComponentPropsChanged(fiber: TFiberNode): boolean {
	const alternate: TFiberNode = fiber.alternate as TFiberNode
	if (!alternate) {
		return true
	}
	const nowPropsKeys: Array<string> = Object.keys(fiber.props).filter((item: string): boolean => {
		return item !== 'children'
	})
	const prePropsKeys: Array<string> = Object.keys(alternate.props).filter((item: string): boolean => {
		return item !== 'children'
	})
	if (nowPropsKeys.length !== prePropsKeys.length) {
		return true
	}
	let isChanged: boolean = false
	for (let i: number = 0; i < nowPropsKeys.length; i++) {
		const key: string = nowPropsKeys[i]
		if (!alternate.props.hasOwnProperty(key)) {
			isChanged = true
			break
		}
		if (!isChanged && fiber.props[key] !== alternate.props[key]) {
			isChanged = true
			break
		}
	}
	return isChanged
}

/**
 * @description 收集函数组件 useEffect 用户回调
 * 		在组件挂载后执行
 * @function cacheFuncComponentEffectHooksOnMounted
 * @param {TFiberNode} fiber 函数组件所对应的 fiber 节点
 * @return {boolean}
 */
export function cacheFuncComponentEffectHooksOnMounted(fiber: TFiberNode): void {
	if (!fiber.effectCachedMounted) {
		for (let i: number = 0; i < fiber.hooks.length; i++) {
			const hookItem: TEffectStruct = fiber.hooks[i] as TEffectStruct
			if ((hookItem as TUseEffectHookStruct).useEffect && hookItem.isUpdated) {
				__RTP__.effectCacheOnMounted.push(hookItem as TUseEffectHookStruct)
				continue
			}
		}
		fiber.effectCachedMounted = true
	}
}

/**
 * @description 收集函数组件 useEffect 用户回调
 * 		在组件卸载后执行
 * @function cacheFuncComponentEffectHooksOnUnmounted
 * @param {TFiberNode} fiber 函数组件所对应的 fiber 节点
 * @return {boolean}
 */
export function cacheFuncComponentEffectHooksOnUnmounted(fiber: TFiberNode): void {
	if (!fiber.effectCachedUnmounted) {
		for (let i: number = 0; i < fiber.hooks.length; i++) {
			const hookItem: TEffectStruct = fiber.hooks[i] as TEffectStruct
			if ((hookItem as TUseEffectHookStruct).useEffect) {
				__RTP__.effectCacheOnUnmounted.push(hookItem)
			}
		}
		fiber.effectCachedUnmounted = true
	}
}

let renderIndex: number = -1
export function createRootFiber(container: HTMLElement): TFiberNode {
	const nodeName: string = container.nodeName.toLowerCase()
	const rootFiber: TFiberNode = createFiberStructData({
		type: nodeName,
		props: { children: [] },
		stateNode: container,
		dirty: false,
		/**
		 * 当前 fiber 的索引编号, 保证值与该 fiber 在 rootFiberList 中的位置索引一致
		 */
		index: ++renderIndex,
		root: true,
		queueUp: false,
	})
	rootFiber.triggerUpdate = true
	const rootFiberIndex: number = rootFiber.index as number

	__RTP__.rootFiberList.push(rootFiber)
	__RTP__.taskGroupQueue[rootFiberIndex] = { count: 0 }
	return rootFiber
}
