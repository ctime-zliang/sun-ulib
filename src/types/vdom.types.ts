export type TVDOM = {
	type: string
	props?: PlainObject
	children?: Array<TVDOM> | Array<any>
	$$typeof?: string
}
