import { TFiberNode, TTASKQUEUE_ITEM } from '../types/fiber.types'
import { TUseStateHookStruct, TUseStateHook } from '../types/hooks.types'
import { __RTP__, __RTCP__ } from '../core/runtime'
import { getRootFiber } from '../utils/utils'
import { getHookItem } from './hook'
import { startReconciliation } from '../lib/scheduler'

function createHookItem(rootFiber: TFiberNode, nowFiber: TFiberNode, initValue: any): TUseStateHookStruct {
	const hookItem: TUseStateHookStruct = {
		useState: true,
		state: initValue,
		preState: initValue,
		isChanged: false,
		setState: () => (void 0)!,
		/* ... */
		rootFiber,
		nowFiber,
	}
	return hookItem
}

export function useState(initValue: any): TUseStateHook {
	const oldHookOfCompt: TUseStateHookStruct = getHookItem(__RTCP__.hookIndexOfNowFunctionCompt) as TUseStateHookStruct
	const nowFiber: TFiberNode = __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode
	const rootFiber: TFiberNode = getRootFiber(__RTCP__.wipFiberOfNowFunctionCompt as TFiberNode)
	if (!oldHookOfCompt) {
		nowFiber.hooks.push(createHookItem(rootFiber, __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode, initValue))
	}
	const hookItem: TUseStateHookStruct = nowFiber.hooks[__RTCP__.hookIndexOfNowFunctionCompt] as TUseStateHookStruct
	if (!oldHookOfCompt) {
		hookItem.setState = (action: any): void => {
			hookItem.preState = hookItem.state
			if (action instanceof Function) {
				hookItem.state = action.call((void 0)!, hookItem.state)
			} else {
				hookItem.state = action
			}

			/**
			 * 将每次 setState 的执行保存到队列中
			 *
			 * 在 Reconciliation + Commit 执行期间被执行的 setState 的次数记录在任务队列中
			 * 在每轮 Reconciliation + Commit 执行结束后, 会尝试调用逐一执行队列(不为空时)中的 setState 调用
			 */
			const rootFiberIndex: number = hookItem.rootFiber.index || 0
			const taskItem: TTASKQUEUE_ITEM = __RTP__.taskGroupQueue[rootFiberIndex]
			taskItem.count++

			/**
			 * 只有在 state 值被修改后才尝试开启 reconciliation 阶段任务
			 * 		特别地, 当 state 是一个引用类型的值时, 需要返回一个新的引用地址才能正常更新组件
			 */
			if (hookItem.state === hookItem.preState) {
				return
			}
			hookItem.nowFiber.triggerUpdate = true

			/**
			 * 仅在空闲状态下开启一轮 Reconciliation + Commit 更新过程
			 * 		定义"空闲状态"即同时满足:
			 * 			1. 没有任何 <App /> 对应的 fiber 根节点被加入到 Reconciliation 过程中
			 * 			2. 没有正在处理的 Reconciliation + Commit 过程
			 */
			if (!hookItem.rootFiber.queueUp && !__RTP__.nextWorkUnitFiber) {
				hookItem.rootFiber.queueUp = true
				// Promise.resolve().then((): void => {
				// 	/**
				// 	 * 在所有同步任务结束后插入一个 microtask, 并在该 microtask 中开启更新过程
				// 	 * 此处的 microtask 将同时起到"防抖"功能, 因此在开启更新过程时可以清空被暂存的 task 标记
				// 	 * 在更新过程进行中时若执行 setState, 将继续暂存到被清空的队列中
				// 	 * Reconciliation + Commit 更新过程结束后检查 setState 队列是否为空, 必要时将继续下一轮更新过程
				// 	 */
				// 	taskItem.count = 0
				// 	startReconciliation(hookItem.rootFiber)
				// })
				taskItem.count = 0
				startReconciliation(hookItem.rootFiber)
			}
		}
	} else {
		hookItem.rootFiber = rootFiber
		hookItem.nowFiber = nowFiber
	}
	__RTCP__.hookIndexOfNowFunctionCompt++

	return [hookItem.state, hookItem.setState]
}
