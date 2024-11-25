import { TEffectStruct, TUseEffectHookStruct } from '../types/hooks.types'
import { TFiberNode, TFiberRootNode, TTASKQUEUE_ITEM } from '../types/fiber.types'
import { TRenderProfile } from 'src/config/config'

type T__RTP__ = {
	globalFiberRoot: TFiberRootNode
	rootFiberList: Array<TFiberNode>
	profile: TRenderProfile & PlainObject
	taskGroupQueue: Array<TTASKQUEUE_ITEM>
	taskGroupIndex: number
	nextWorkUnitFiber: TFiberNode
	effectCacheOnMounted: Array<TUseEffectHookStruct>
	effectCacheOnUnmounted: Array<TEffectStruct>
	updateRangeStartFiber: TFiberNode
}
export const __RTP__: T__RTP__ = Object.create({
	globalFiberRoot: null,
	rootFiberList: [],
	profile: {},
	taskGroupQueue: [],
	taskGroupIndex: -1,
	nextWorkUnitFiber: null,
	effectCacheOnMounted: [],
	effectCacheOnUnmounted: [],
	updateRangeStartFiber: null,
})

type T__RTCP__ = {
	hookIndexOfNowFunctionCompt: number
	wipFiberOfNowFunctionCompt: TFiberNode
}
export const __RTCP__: T__RTCP__ = Object.create({
	hookIndexOfNowFunctionCompt: -1,
	wipFiberOfNowFunctionCompt: null,
})
