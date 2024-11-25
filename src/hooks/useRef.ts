import { TFiberNode } from '../types/fiber.types'
import { TUseRefHookStruct } from '../types/hooks.types'
import { __RTP__, __RTCP__ } from '../core/runtime'
import { getHookItem } from './hook'

function createHookItem(initalValue: any): TUseRefHookStruct {
	const hookItem: TUseRefHookStruct = {
		useRef: true,
		initalValue,
		returnValue: {
			current: initalValue,
		},
	}
	return hookItem
}

export function useRef(initialValue: any): { current: any } {
	const oldHookOfCompt: TUseRefHookStruct = getHookItem(__RTCP__.hookIndexOfNowFunctionCompt) as TUseRefHookStruct
	const nowFiber: TFiberNode = __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode
	if (!oldHookOfCompt) {
		nowFiber.hooks.push(createHookItem(initialValue))
	}
	const hookItem: TUseRefHookStruct = nowFiber.hooks[__RTCP__.hookIndexOfNowFunctionCompt] as TUseRefHookStruct
	if (oldHookOfCompt) {
		hookItem.returnValue = oldHookOfCompt.returnValue
	}

	__RTCP__.hookIndexOfNowFunctionCompt++

	return hookItem.returnValue
}
