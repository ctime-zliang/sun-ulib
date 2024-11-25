import { TUseEffectHookStruct, TUseMemoHookStruct, TAllHooksStruct, TUseCallbackHookStruct } from '../types/hooks.types'
import { __RTCP__ } from '../core/runtime'
import { TFiberNode } from '../types/fiber.types'

export function getHookItem(index: number): TAllHooksStruct {
	if (!__RTCP__.wipFiberOfNowFunctionCompt) {
		return (void 0)!
	}
	const alternate: TFiberNode = __RTCP__.wipFiberOfNowFunctionCompt.alternate as TFiberNode
	if (!alternate) {
		return (void 0)!
	}
	return alternate.hooks && alternate.hooks[index]
}

export function setHookUpdate(
	hook: TUseEffectHookStruct | TUseMemoHookStruct | TUseCallbackHookStruct,
	outerDependences: Array<any> = (void 0)!
): void {
	/**
	 * 对比依赖的变更
	 * 浅层比较
	 */
	if (hook.dependences instanceof Array && outerDependences instanceof Array) {
		for (let i: number = 0; i < hook.dependences.length; i++) {
			if (!Object.is(hook.dependences[i], outerDependences[i])) {
				hook.isUpdated = true
				break
			}
		}
		return
	}
	hook.isUpdated = true
}
