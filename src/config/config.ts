export type TGlobalConfig = {
	requestIdleCallbackTimeout: number
} & PlainObject
export const globalConfig: TGlobalConfig = {
	requestIdleCallbackTimeout: 100,
}

export type TRenderProfile = {
	async: boolean
}
export const initRenderProfile: TRenderProfile = {
	async: true,
}
