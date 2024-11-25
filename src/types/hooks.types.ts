import { TFiberNode } from './fiber.types'

export type TAllHooksStruct = TUseStateHookStruct | TUseEffectHookStruct | TUseMemoHookStruct | TUseCallbackHookStruct | TUseRefHookStruct

export type TEffectStruct = TUseEffectHookStruct

export type TUseStateHook = [any, (action: any) => void]
export type TUseStateHookStruct = {
	useState: boolean
	rootFiber: TFiberNode
	nowFiber: TFiberNode
	isChanged: boolean
	state: any
	preState: any
	setState: (a: any) => void
}

export type TUseEffectHookStruct = {
	useEffect: boolean
	isUpdated: boolean
	dependences: Array<any>
	callback?: Function
	returnCallback?: Function
}

export type TUseMemoHookStruct = {
	useMemo: boolean
	isUpdated: boolean
	dependences: Array<any>
	callback?: Function
	returnValue?: any
}

export type TUseCallbackHookStruct = {
	useCallback: boolean
	isUpdated: boolean
	dependences: Array<any>
	callback?: Function
	returnCallback?: any
}

export type TUseRefHookStruct = {
	useRef: boolean
	initalValue: any
	returnValue: {
		current: any
	}
}
