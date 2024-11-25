interface Window {
	__RTP__: any
	__RTCP__: any
	[key: string]: any
}

declare var window: Window & typeof globalThis

declare type PlainObject<T = any> = Record<string, T>
