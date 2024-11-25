import { TVDOM } from './vdom.types'

export type TCreateRootFiberResult = {
	render(element: TVDOM): void
}
