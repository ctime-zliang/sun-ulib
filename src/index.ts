import {
	createElement,
	createTextElement,
	setSyncMode,
	Fragment as _Fragment,
	render as _render,
	createRoot as _createRoot,
	memo as _memo,
} from './main'
import { useState as useStateHook } from './hooks/useState'
import { useEffect as useEffectHook } from './hooks/useEffect'
import { useMemo as useMemoHook } from './hooks/useMemo'
import { useCallback as useCallbackHook } from './hooks/useCallback'
import { useRef as useRefHook } from './hooks/useRef'
/* ... */
import { TUseStateHook } from './types/hooks.types'
import { TVDOM } from './types/vdom.types'
import { TFiberNode } from './types/fiber.types'
import { TCreateRootFiberResult } from './types/commmon'

const Sun: any = Object.create(null)

window.__SUN__ = Sun

Sun.createElement = createElement as (type: string, props: PlainObject, ...children: any[]) => TVDOM
Sun.createTextElement = createTextElement as (text: string) => TVDOM
Sun.setSyncMode = setSyncMode as () => void

Sun.render = _render as (element: TVDOM, containe: HTMLElement) => void
Sun.createRoot = _createRoot as (container: HTMLElement) => TCreateRootFiberResult
Sun.Fragment = _Fragment as () => DocumentFragment
Sun.memo = _memo as (element: Function) => TFiberNode
Sun.useState = useStateHook as (initialValue: any) => TUseStateHook
Sun.useEffect = useEffectHook as (callback: () => any, dependences: Array<any> | undefined) => void
Sun.useLayoutEffect = useEffectHook as (callback: () => any, dependences: Array<any> | undefined) => void
Sun.useMemo = useMemoHook as (callback: () => any, dependences: Array<any> | undefined) => any
Sun.useCallback = useCallbackHook as (callback: () => any, dependences: Array<any> | undefined) => any
Sun.useRef = useRefHook as (initialValue: any) => { current: any }

export const render: (element: TVDOM, container: HTMLElement) => void = _render
export const createRoot: (container: HTMLElement) => TCreateRootFiberResult = _createRoot
export const Fragment: () => DocumentFragment = _Fragment
export const memo: (element: Function) => TFiberNode = _memo
export const useState: (initialValue: any) => TUseStateHook = useStateHook
export const useEffect: (callback: () => any, dependences: Array<any> | undefined) => void = useEffectHook
export const useLayoutEffect: (callback: () => any, dependences: Array<any> | undefined) => void = useEffectHook
export const useMemo: (callback: () => any, dependences: Array<any> | undefined) => any = useMemoHook
export const useCallback: (callback: () => any, dependences: Array<any> | undefined) => any = useCallbackHook
export const useRef: (initialValue: any) => { current: any } = useRefHook

export default Sun
