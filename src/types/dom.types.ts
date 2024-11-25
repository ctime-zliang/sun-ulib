interface IHTMLElement extends HTMLElement {}
export type TExtendHTMLElment = IHTMLElement & {}

interface IHTMLDOMElment extends Text {
	removeAttribute?: (...args: any) => void
	style?: PlainObject
	[key: string]: any
}
export type TExtendHTMLDOMElment = TExtendHTMLElment & IHTMLDOMElment
