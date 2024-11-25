import { __RTP__ } from '../core/runtime'
import { createFiberStructData } from '../utils/utils'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'
import { TVDOM } from '../types/vdom.types'

export function reconcileChilren(wipFiber: TFiberNode, deletions: Array<TFiberNode>): void {
	/**
	 * 获取当前 fiber 节点下所有子节点的 VDOM 列表
	 * 		fiber 节点的 child 属性将指向该节点的第一个子 fiber 节点
	 * 		fiber 节点的 sibling 属性将指向该节点的下一个兄弟 fiber 节点
	 * 		fiber 节点的 props 属性同 VDOM 的 props
	 */
	const children: Array<TVDOM> = wipFiber.props.children
	/**
	 * 需要清除上一轮更新完毕时保存的上上一轮的当前层 fiber 节点的引用
	 */
	if (wipFiber.alternate && wipFiber.alternate.alternate) {
		wipFiber.alternate.alternate = null!
	}
	/**
	 * 需要循环遍历当前 VDOM 下的所有子节点
	 * 作为参照对比, 此处读取上一轮更新完毕后该层 fiber 节点的第一个子节点
	 * 并与本轮更新中当前层 fiber 节点的子节点(VDOM)做对比
	 */
	let oldChildFiberOfNowWIPFiber: TFiberNode = wipFiber.alternate && wipFiber.alternate.child
	let prevSiblingFiber: TFiberNode = null!
	let index: number = 0
	while (index < children.length || oldChildFiberOfNowWIPFiber != null) {
		const childVDomItem: TVDOM = children[index]
		let newChildFiber: TFiberNode = null!
		if (!childVDomItem) {
			/**
			 * 当 oldFiber 无法找到对应的新 fiber 时, 即代表需要删除该节点
			 */
			if (oldChildFiberOfNowWIPFiber) {
				oldChildFiberOfNowWIPFiber.effectTag = ENUM_EFFECT_TAG.DELETION
				oldChildFiberOfNowWIPFiber.dirty = true
				oldChildFiberOfNowWIPFiber.effectCachedMounted = false
				deletions.push(oldChildFiberOfNowWIPFiber)
				oldChildFiberOfNowWIPFiber = oldChildFiberOfNowWIPFiber.sibling
			}
			index++
			continue
		}
		const triggerUpdate: boolean = !!(oldChildFiberOfNowWIPFiber && oldChildFiberOfNowWIPFiber.triggerUpdate)
		const effectTag: string = getEffectTag(childVDomItem, oldChildFiberOfNowWIPFiber as TFiberNode, wipFiber)
		if (effectTag === ENUM_EFFECT_TAG.UPDATE) {
			newChildFiber = createFiberStructData({
				stateNode: (oldChildFiberOfNowWIPFiber as TFiberNode).stateNode,
				type: childVDomItem.type,
				props: childVDomItem.props,
				parent: wipFiber,
				dirty: true,
				alternate: oldChildFiberOfNowWIPFiber,
				effectTag: ENUM_EFFECT_TAG.UPDATE,
				triggerUpdate,
				hooks: (oldChildFiberOfNowWIPFiber as TFiberNode).hooks,
			})
		} else {
			newChildFiber = createFiberStructData({
				stateNode: null,
				type: childVDomItem.type,
				props: childVDomItem.props,
				parent: wipFiber,
				dirty: true,
				alternate: null!,
				effectTag,
			})
			if (oldChildFiberOfNowWIPFiber) {
				oldChildFiberOfNowWIPFiber.effectTag = ENUM_EFFECT_TAG.DELETION
				oldChildFiberOfNowWIPFiber.dirty = true
				oldChildFiberOfNowWIPFiber.effectCachedMounted = false
				deletions.push(oldChildFiberOfNowWIPFiber)
			}
		}
		newChildFiber.typeof = newChildFiber.props.$$typeof
		/**
		 * oldChildFiberOfNowWIPFiber 作为当前 wipFiber 的上一轮更新完毕后的镜像(引用持有)存储节点
		 * 每轮循环中需随着循环进行, 后移到下一个兄弟节点
		 */
		if (oldChildFiberOfNowWIPFiber) {
			oldChildFiberOfNowWIPFiber = oldChildFiberOfNowWIPFiber.sibling
		}
		/**
		 * 将第一个 child fiber 节点作为本次执行 reconcile 时传入的 fiber 节点的子节点
		 *
		 * 		now-fiber(wipFiber)
		 *  	 /
		 * 		/
		 * newChildFiber ———— nextNewChildFiber ————
		 *
		 * 且后续的 child fiber 节点将作为第一个 child fiber 节点的兄弟节点依次串联
		 */
		if (index === 0) {
			wipFiber.child = newChildFiber
		} else if (prevSiblingFiber) {
			prevSiblingFiber.sibling = newChildFiber
		}
		prevSiblingFiber = newChildFiber
		index++
	}
}

function getEffectTag(childVDomItem: TVDOM, oldChildFiberOfNowWIPFiber: TFiberNode, wipFiber: TFiberNode): string {
	if (wipFiber.effectTag === ENUM_EFFECT_TAG.REPLACE) {
		return ENUM_EFFECT_TAG.REPLACE
	}
	if (!oldChildFiberOfNowWIPFiber) {
		return ENUM_EFFECT_TAG.PLACEMENT
	}
	if (childVDomItem.type === oldChildFiberOfNowWIPFiber.type) {
		return ENUM_EFFECT_TAG.UPDATE
	}
	return ENUM_EFFECT_TAG.REPLACE
}
