import { TFiberNode } from '../types/fiber.types'
import { TUseEffectHookStruct } from '../types/hooks.types'
import { __RTP__, __RTCP__ } from '../core/runtime'
import { getHookItem, setHookUpdate } from './hook'

function createHookItem(callback: () => any): TUseEffectHookStruct {
	const hookItem: TUseEffectHookStruct = {
		useEffect: true,
		isUpdated: false,
		dependences: (void 0)!,
		callback,
		returnCallback: (void 0)!,
	}
	return hookItem
}

export function useEffect(callback: () => any, dependences: Array<any> = (void 0)!): void {
	const oldHookOfCompt: TUseEffectHookStruct = getHookItem(__RTCP__.hookIndexOfNowFunctionCompt) as TUseEffectHookStruct
	const nowFiber: TFiberNode = __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode
	if (!oldHookOfCompt) {
		nowFiber.hooks.push(createHookItem(callback))
	}
	const hookItem: TUseEffectHookStruct = nowFiber.hooks[__RTCP__.hookIndexOfNowFunctionCompt] as TUseEffectHookStruct
	if (!oldHookOfCompt) {
		hookItem.isUpdated = true
		hookItem.dependences = dependences instanceof Array ? Array.from(dependences) : (void 0)!
	} else {
		hookItem.isUpdated = false
		hookItem.callback = oldHookOfCompt.callback
		hookItem.returnCallback = oldHookOfCompt.returnCallback
		hookItem.dependences = oldHookOfCompt.dependences
	}

	setHookUpdate(hookItem, dependences)

	__RTCP__.hookIndexOfNowFunctionCompt++
}
