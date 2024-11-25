import { isProperty, isOld, isNewly, isSystemEvent, hasProperty } from '../utils/utils'
import { ENUM_NODE_TYPE } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'
import { TExtendHTMLDOMElment } from '../types/dom.types'

/**
 * @description 追加 DOM 子节点
 * @function appendChild
 * @param {TExtendHTMLDOMElment} childDom 被追加的子节点
 * @param {TExtendHTMLDOMElment} parentDom 目标父节点
 * @return {undefined}
 */
export function appendChild(childDom: TExtendHTMLDOMElment, parentDom: TExtendHTMLDOMElment): boolean {
	if (!parentDom || !childDom || parentDom === childDom) {
		return false
	}
	parentDom.appendChild(childDom)
	return true
}

/**
 * @description 移除 DOM 子节点
 * @function removeChild
 * @param {TExtendHTMLDOMElment} childDom 被追加的子节点
 * @param {TExtendHTMLDOMElment} parentDom 目标父节点
 * @return {undefined}
 */
export function removeChild(childDom: TExtendHTMLDOMElment, parentDom: TExtendHTMLDOMElment): boolean {
	if (!parentDom || !childDom || parentDom === childDom) {
		return false
	}
	parentDom.removeChild(childDom)
	return true
}

/**
 * @description 插入 DOM 子节点
 * @function insertChild
 * @param {TExtendHTMLDOMElment} childDom 被插入的子节点
 * @param {TExtendHTMLDOMElment} beforeAtDom 参考的子节点, 插入到该节点之前
 * @param {TExtendHTMLDOMElment} parentDom 目标父节点
 * @return {undefined}
 */
export function insertChild(childDom: TExtendHTMLDOMElment, beforeAtDom: TExtendHTMLDOMElment, parentDom: TExtendHTMLDOMElment): boolean {
	if (!parentDom || !childDom) {
		return false
	}
	if (!beforeAtDom || beforeAtDom.parentElement !== parentDom) {
		parentDom.appendChild(childDom)
		return false
	}
	parentDom.insertBefore(childDom, beforeAtDom)
	return true
}

/**
 * @description 创建标准 DOM 对象
 * @function createDOM
 * @param {TFiberNode} fiber fiber 节点对象
 * @return {TExtendHTMLDOMElment} 元素 HTMLElement DOM 对象
 */
export function createDOM(fiber: TFiberNode): TExtendHTMLDOMElment {
	const dom: TExtendHTMLDOMElment =
		fiber.type === ENUM_NODE_TYPE.TEXT_NODE
			? (document.createTextNode(``) as TExtendHTMLDOMElment)
			: (document.createElement(fiber.type as string) as TExtendHTMLDOMElment)
	updateDOM(dom, {}, fiber.props as PlainObject)
	return dom
}

/**
 * @description 更新 DOM
 * @function updateDOM
 * @param {TExtendHTMLDOMElment} dom HTMLElement 节点对象
 * @param {object} oldProps Props 属性对象
 * @param {object} newProps Props 属性对象
 * @return {undefined}
 */
export function updateDOM(dom: TExtendHTMLDOMElment, oldProps: PlainObject = {}, newProps: PlainObject = {}): void {
	const systemEventOfOldProps = Object.keys(oldProps).filter(isSystemEvent)
	const systemEventOfNewProps = Object.keys(newProps).filter(isSystemEvent)
	const commPropsOfOldProps = Object.keys(oldProps).filter(isProperty)
	const commPropsOfNewProps = Object.keys(newProps).filter(isProperty)
	/* ... */
	const isNewlyHandlerNewProps: (key: string) => boolean = isNewly(oldProps, newProps)

	/**
	 * 移除系统事件
	 */
	for (let i: number = 0; i < systemEventOfOldProps.length; i++) {
		const item: string = systemEventOfOldProps[i]
		if (!hasProperty(newProps, item) || isNewlyHandlerNewProps(item)) {
			const eventType: string = item.toLowerCase().substring(2)
			dom.removeEventListener(eventType, oldProps[item])
		}
	}
	/**
	 * 删除旧属性
	 */
	for (let i: number = 0; i < commPropsOfOldProps.length; i++) {
		const item: string = commPropsOfOldProps[i]
		if (isOld(oldProps, newProps)(item)) {
			dom[item] = undefined
			if (dom.removeAttribute) {
				dom.removeAttribute(item)
			}
		}
	}
	/**
	 * 更新或写入新属性
	 */
	for (let i: number = 0; i < commPropsOfNewProps.length; i++) {
		const item: string = commPropsOfNewProps[i]
		if (isNewlyHandlerNewProps(item)) {
			if (/^\$/gi.test(item)) {
				continue
			}
			switch (item) {
				case 'style': {
					if (Object.prototype.toString.call(newProps[item]).toLowerCase() === '[object object]') {
						for (let attr in newProps[item]) {
							dom.style[attr] = newProps[item][attr]
						}
						break
					}
					// dom[item] = newProps[item]
					break
				}
				case 'className': {
					dom.className = newProps[item]
					break
				}
				case 'ref': {
					break
				}
				case 'nodeValue': {
					dom.nodeValue = newProps.nodeValue
					break
				}
				default: {
					dom[item] = newProps[item]
					if (dom.setAttribute && typeof newProps[item] != 'undefined') {
						dom.setAttribute(item, newProps[item])
					}
				}
			}
		}
	}
	/**
	 * 绑定系统事件
	 */
	for (let i: number = 0; i < systemEventOfNewProps.length; i++) {
		const item: string = systemEventOfNewProps[i]
		if (isNewlyHandlerNewProps(item)) {
			const eventType: string = item.toLowerCase().substring(2)
			const fn: (e: Event) => void = newProps[item].bind(undefined)
			newProps[item] = function (e: Event): void {
				if (!e) {
					console.warn(`DOM Event Handler Error.`)
					return
				}
				e.stopPropagation()
				fn.call(e.target, e)
			}
			dom.addEventListener(eventType, newProps[item])
		}
	}
}
