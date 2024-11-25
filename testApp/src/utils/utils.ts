export function getElementStyle(element: HTMLElement, name: string): string {
	if ((element as any).currentStyle) {
		return (element as any).currentStyle[name]
	}
	return window.getComputedStyle(element, null)[name]
}

export function intervalAnimate(element: HTMLElement, attr: string, target: number, callback: () => void): void {
	window.clearInterval((element as any).timer)
	;(element as any).timer = window.setInterval((): void => {
		let cur: number = 0
		if (attr === 'opacity') {
			cur = Math.round(parseFloat(getElementStyle(element, attr)) * 100)
		} else {
			cur = parseInt(getElementStyle(element, attr))
		}
		let speed: number = (target - cur) / 10
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
		if (target === cur) {
			window.clearInterval((element as any).timer)
			callback && callback()
		} else {
			if (attr === 'opacity') {
				element.style.filter = 'alpha(opacity:' + (cur + speed) + ')'
				element.style.opacity = String((cur + speed) / 100)
			} else {
				element.style[attr] = cur + speed + 'px'
			}
		}
	}, 16.67)
}

export function syncBlock(delay: number = 1000): void {
	const end: number = new Date().getTime() + delay
	let i: number = 0
	while (new Date().getTime() < end) {
		++i
	}
}

export const formatDates = (date = new Date(), format: string = 'yyyy-MM-dd HH:ii:ss'): string => {
	let o: { [key: string]: any } = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'H+': date.getHours(),
		'h+': date.getHours(),
		'i+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth() + 3) / 3),
		S: date.getMilliseconds(),
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
		}
	}
	return format
}
