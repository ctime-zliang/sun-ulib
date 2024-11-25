/**
 * 该试验库依据"Build Your React"拓展改编
 */

import { __RTP__, __RTCP__ } from './core/runtime'
import { createRootFiber, flatArray, createFiberStructData, createInitialVDOMStructData } from './utils/utils'
import { TVDOM } from './types/vdom.types'
import { ENUM_NODE_TYPE } from './config/effect.enum'
import { globalConfig, initRenderProfile } from './config/config'
import { TFiberNode } from './types/fiber.types'
import { EFiberType } from './config/fiber.enum'
import { initAsyncWorkLoop, initSyncWorkLoop } from './lib/scheduler'
import { TCreateRootFiberResult } from './types/commmon'

window.__RTP__ = __RTP__
window.__RTCP__ = __RTCP__

/**
 * 创建一个全局顶层 fiber: globalFiberRoot
 * 当需要渲染多个实例时(仅指首次渲染), globalFiberRoot.current 将依次(按照 render 调用先后顺序)指向各个 <App /> 对应的 fiber 树的根 fiber 节点
 */
__RTP__.globalFiberRoot = Object.create({
	current: void 0,
})

__RTP__.profile = { ...initRenderProfile }

/**
 * @description 创建元素 VDOM
 * @function createElement
 * @param {string} type 元素标签名
 * @param {object} props 属性对象
 * @param {any} children 子节点列表
 * @return {TVDOM}
 */
export function createElement(type: any, props: PlainObject, ...children: Array<any>): TVDOM {
	let $$type: any = typeof type === 'object' ? type.type : type
	let $$typeof: any = undefined
	if (typeof type === 'object' && type.typeof) {
		$$typeof = type.typeof
	} else if (type instanceof Function) {
		if (type['__@@INSIDE_FRAGMENT_ANCHOR'] === true) {
			$$typeof = EFiberType.Fragment
		} else {
			$$typeof = 'function'
		}
	} else {
		$$typeof = $$type
	}
	// const flatChildren: Array<any> = (children as any).flat(Infinity)
	const flatChildren: Array<any> = flatArray(children)
	const elementVDom: TVDOM = createInitialVDOMStructData($$type, {
		...props,
		children: flatChildren.map((child: any): void => {
			return typeof child === 'object' ? child : createTextElement(child)
		}),
		$$typeof,
	})
	return elementVDom
}

/**
 * @description 创建文本 VDOM
 * @function createTextElement
 * @param {string} text 文本内容
 * @return {TVDOM}
 */
export function createTextElement(text: string): TVDOM {
	const textVDom: TVDOM = createInitialVDOMStructData(ENUM_NODE_TYPE.TEXT_NODE, {
		children: [],
		nodeValue: text,
		$$typeof: `text`,
	})
	return textVDom
}

/**
 * @description 设置 fiber 树遍历模式为 同步递归 模式
 * @function setSyncMode
 * @return {void}
 */
export function setSyncMode(): void {
	__RTP__.profile.async = false
}

/**
 * @description 渲染 JSX 节点
 * @function render
 * @param {JSXElement} element JSX 节点
 * @param {HTMLElement} container 容器 HTML DOM 节点
 * @param {object} profile 配置项
 * @return {void}
 */
export function render(element: TVDOM, container: HTMLElement): void {
	const handler: TCreateRootFiberResult = createRoot(container)
	handler.render(element)
}

/**
 * @description 创建渲染根节点
 * 		创建 root-fiber 节点
 * 		返回 root-fiber-controller 实例
 * @function createRoot
 * @param {HTMLElement} container 容器 HTML DOM 节点
 * @param {object} profile 配置项
 * @return {RootFiberController}
 */
export function createRoot(container: HTMLElement): TCreateRootFiberResult {
	let rootFiber: TFiberNode = createRootFiber(container)
	return {
		render(element: TVDOM): void {
			rootFiber.props.children.push(element)
			rootFiber.dirty = true
			if (__RTP__.globalFiberRoot && !__RTP__.globalFiberRoot.current) {
				__RTP__.globalFiberRoot.current = rootFiber
				__RTP__.nextWorkUnitFiber = rootFiber
				if (__RTP__.profile.async) {
					window.requestIdleCallback(initAsyncWorkLoop(), { timeout: globalConfig.requestIdleCallbackTimeout })
				} else {
					initSyncWorkLoop()()
				}
			}
			rootFiber = undefined as any
		},
	}
}

/**
 * @description memo 优化
 * 		设置当 props 浅对比为 false 时跳过该 JSX Element 的本次执行
 * @function memo
 * @param {JSXElement} element JSX 节点
 * @return {TFiberNode}
 */
export function memo(element: Function): TFiberNode {
	return createFiberStructData({
		type: element,
		typeof: EFiberType.Memo,
	})
}

/**
 * @description 文档碎片 JSX 元素
 * @function Fragment
 * @return {DocumentFragment}
 */
export function Fragment(): DocumentFragment {
	return document.createDocumentFragment()
}
Fragment['__@@INSIDE_FRAGMENT_ANCHOR'] = true
