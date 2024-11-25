import { __RTP__ } from '../core/runtime'
import { updateDOM, appendChild, removeChild, insertChild } from './dom'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'
import { TExtendHTMLDOMElment } from '../types/dom.types'
import {
	cacheFuncComponentEffectHooksOnMounted,
	cacheFuncComponentEffectHooksOnUnmounted,
	getNearestChildFiberWithHoldDom,
	getNearestParentFiberWithHoldDom,
	isFunctionComponent,
} from '../utils/utils'
import { EFiberType } from '../config/fiber.enum'

function handleDeletionDom(fiber: TFiberNode): boolean {
	if (fiber.props.ref) {
		fiber.props.ref.current = null!
	}
	if (isFunctionComponent(fiber)) {
		cacheFuncComponentEffectHooksOnUnmounted(fiber)
		return false
	}
	const parentFiber: TFiberNode = getNearestParentFiberWithHoldDom(fiber.parent as TFiberNode)
	if (fiber.typeof === EFiberType.Fragment) {
		fiber.stateNode = parentFiber.stateNode
	}
	if (parentFiber && parentFiber.stateNode) {
		return removeChild(fiber.stateNode, parentFiber.stateNode)
	}
	return false
}

export function commitDeletion(fiber: TFiberNode): void {
	if (!fiber) {
		return
	}
	const root: TFiberNode = fiber
	let current: TFiberNode = fiber
	let isGotoSibling: boolean = false

	while (current) {
		isGotoSibling = false
		if (current.dirty) {
			handleDeletionDom(current)
			current.dirty = false
		}
		if (current.child) {
			current = current.child
			current.dirty = true
			if (current.dirty) {
				isGotoSibling = handleDeletionDom(current)
				current.dirty = false
			}
			if (!isGotoSibling) {
				continue
			}
		}
		while (!current.sibling) {
			if (current.parent === root || current === root) {
				return
			}
			current = current.parent as TFiberNode
		}
		current = current.sibling
		current.dirty = true
	}
}

/******************************************************************************************/
/******************************************************************************************/

/**
 * 对于 effectTag === ENUM_EFFECT_TAG.REPLACE 的 fiber 节点树(该节点和其下的子孙 fiber 节点)
 * 在进入该树的遍历时, 需要记录该树的树根 fiber 节点 A
 * 在执行插入时, 需要尝试找到 A 节点的下一个兄弟节点 B, 并将该树对应的 DOM 树插入到 B 节点对应的真实 DOM 之前
 * 如果 B 不存在, 则直接添加(追加)到 A 的父节点对应的真实 DOM 树中
 */
let openStartRecord: boolean = false
let startFiberOfSetReplace: TFiberNode = (void 0)!
function handleDom(fiber: TFiberNode): void {
	if (openStartRecord && startFiberOfSetReplace === fiber) {
		openStartRecord = false
	}
	if (openStartRecord === false && fiber.effectTag === ENUM_EFFECT_TAG.REPLACE) {
		openStartRecord = true
		startFiberOfSetReplace = fiber
	}
	if (isFunctionComponent(fiber)) {
		cacheFuncComponentEffectHooksOnMounted(fiber)
		return
	}
	const parentFiber: TFiberNode = getNearestParentFiberWithHoldDom(fiber.parent as TFiberNode)
	if (fiber.typeof === EFiberType.Fragment) {
		fiber.stateNode = parentFiber.stateNode
	}
	if (fiber.props.ref) {
		fiber.props.ref.current = fiber.stateNode
	}
	if (parentFiber && parentFiber.stateNode) {
		if (fiber.stateNode === parentFiber.stateNode) {
			return
		}
		if (fiber.effectTag === ENUM_EFFECT_TAG.PLACEMENT) {
			appendChild(fiber.stateNode, parentFiber.stateNode)
			return
		}
		if (fiber.effectTag === ENUM_EFFECT_TAG.UPDATE) {
			updateDOM(fiber.stateNode as TExtendHTMLDOMElment, fiber.alternate ? fiber.alternate.props : {}, fiber.props)
			return
		}
		if (fiber.effectTag === ENUM_EFFECT_TAG.REPLACE) {
			if (startFiberOfSetReplace) {
				const siblingChildFiber: TFiberNode = getNearestChildFiberWithHoldDom(startFiberOfSetReplace.sibling as TFiberNode)
				insertChild(fiber.stateNode, siblingChildFiber ? siblingChildFiber.stateNode : null!, parentFiber.stateNode)
			}
			return
		}
	}
}

export function commit(fiber: TFiberNode): void {
	if (!fiber) {
		return
	}
	const root: TFiberNode = fiber
	let current: TFiberNode = fiber

	while (current) {
		if (current.dirty) {
			handleDom(current)
			current.dirty = false
		}
		if (current.child) {
			current = current.child
			if (current.dirty) {
				handleDom(current)
				current.dirty = false
			}
			continue
		}
		if (current === root) {
			return
		}
		while (!current.sibling) {
			if (current.parent === root) {
				return
			}
			current = current.parent as TFiberNode
		}
		current = current.sibling
	}
}
