const BASE_DEGREE: number = Math.PI / 180

class ClockCanvasProfile {
	/**
	 * 画布尺寸
	 */
	protected canvasWidth: number
	protected canvasHeight: number
	/**
	 * 表盘半径
	 */
	protected clockRadius: number
	protected innerClockRadius: number
	/**
	 * 表盘标记
	 */
	protected distOfMark2Outline: number
	protected hourMarkStrokeColor: string
	protected hourMarkWidth: number
	protected hourMarkLength: number
	protected minMarkStrokeColor: '#536b7a'
	protected minMarkWidth: number
	protected minMarkLength: number
	/**
	 * 文本标记
	 */
	protected distOfTextMark2Outline: number
	protected timeTextMarkFillColor: string
	protected timeTextMarkFont: string
	/**
	 * 指针
	 */
	protected hourHandFillColor: string
	protected hourHandStrokeColor: string
	protected hourHandWidth: number
	protected hourHandLength: number
	protected minHandFillColor: string
	protected minHandStrokeColor: string
	protected minHandWidth: number
	protected minHandLength: number
	protected secHandFillColor: string
	protected secHandStrokeColor: string
	protected secHandWidth: number
	protected secHandLength: number
	protected secHandOverflowLength: number
	/**
	 * 中心圆/环
	 */
	protected centerCircleRadius: number
	protected centerCircleFillColor: string
	protected centerRingInnerRadius: number
	protected centerRingWidth: number
	protected centerRingFillColor: string
	/**
	 * 边框/环
	 */
	protected clockOutlineWidth: number
	constructor() {
		/**
		 * 画布尺寸
		 */
		this.canvasWidth = 200
		this.canvasHeight = 200
		/**
		 * 表盘半径
		 */
		this.clockRadius = 0
		this.innerClockRadius = 0
		/**
		 * 表盘标记
		 */
		this.distOfMark2Outline = 10
		this.hourMarkStrokeColor = '#ffffff'
		this.hourMarkWidth = 3
		this.hourMarkLength = 20
		this.minMarkStrokeColor = '#536b7a'
		this.minMarkWidth = 2
		this.minMarkLength = 10
		/**
		 * 文本标记
		 */
		this.distOfTextMark2Outline = 50
		this.timeTextMarkFillColor = '#58717e'
		this.timeTextMarkFont = '32px Microsoft yahei'
		/**
		 * 指针
		 */
		this.hourHandFillColor = '#ffffff'
		this.hourHandStrokeColor = '#ffffff'
		this.hourHandWidth = 10
		this.hourHandLength = 0
		this.minHandFillColor = '#ffffff'
		this.minHandStrokeColor = '#ffffff'
		this.minHandWidth = 6
		this.minHandLength = 0
		this.secHandFillColor = '#ffffff'
		this.secHandStrokeColor = '#ffffff'
		this.secHandWidth = 4
		this.secHandLength = 0
		this.secHandOverflowLength = 38
		/**
		 * 中心圆/环
		 */
		this.centerCircleRadius = 15
		this.centerCircleFillColor = '#ffffff'
		this.centerRingInnerRadius = 8
		this.centerRingWidth = 1
		this.centerRingFillColor = '#cdd2d5'
		/**
		 * 边框
		 */
		this.clockOutlineWidth = 8
	}

	protected profileCorrection(): void {
		const baseSize: number = Math.min(this.canvasWidth, this.canvasHeight)
		this.clockRadius = baseSize * 0.45
		this.innerClockRadius = this.clockRadius - this.clockOutlineWidth
		this.hourHandLength = this.innerClockRadius - 45
		this.minHandLength = this.innerClockRadius - 15
		this.secHandLength = this.innerClockRadius - 10
	}

	protected setCanvasClientRect(setWidth: number, setHeight: number): void {
		if (setWidth <= 0 || setHeight <= 0) {
			return
		}
		this.canvasWidth = setWidth
		this.canvasHeight = setHeight
	}
}

export class ClockCanvas extends ClockCanvasProfile {
	private canvasElement: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D
	private rAFHandle: any
	constructor(canvasElement: HTMLCanvasElement) {
		super()
		this.canvasElement = canvasElement
		this.ctx = this.canvasElement.getContext('2d') as CanvasRenderingContext2D
		this.profileCorrection()
	}

	private draw() {
		if (!this.canvasElement || this.canvasElement.nodeName.toUpperCase() != 'CANVAS') {
			return
		}
		const ctx: CanvasRenderingContext2D = this.canvasElement.getContext('2d') as CanvasRenderingContext2D
		const now = new Date()
		const sec = now.getSeconds()
		const min = now.getMinutes()
		const hour = now.getHours()
		const msec = now.getMilliseconds()

		/**
		 * 保存一份初始 ctx 状态
		 */
		ctx.save()
		/**
		 * 绘制表盘底色
		 */
		ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
		const lingrad = ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight)
		lingrad.addColorStop(0, '#242f37')
		lingrad.addColorStop(1, '#48585c')
		ctx.fillStyle = lingrad
		ctx.arc(this.canvasWidth * 0.5, this.canvasHeight * 0.5, this.innerClockRadius, 0, Math.PI * 2, true)
		ctx.fill()
		ctx.restore()

		ctx.save()
		/**
		 * 小时刻度
		 */
		ctx.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5)
		const hourMarkStartX = this.innerClockRadius - this.distOfMark2Outline
		for (let i = 0; i < 12; i++) {
			ctx.beginPath()
			ctx.strokeStyle = this.hourMarkStrokeColor
			ctx.lineWidth = this.hourMarkWidth
			ctx.rotate(30 * BASE_DEGREE)
			ctx.moveTo(hourMarkStartX, 0)
			ctx.lineTo(hourMarkStartX - this.hourMarkLength, 0)
			ctx.stroke()
		}
		ctx.restore()

		ctx.save()
		/**
		 * 分钟刻度
		 */
		ctx.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5)
		const minMarkStartX = this.innerClockRadius - this.distOfMark2Outline
		for (let i = 1; i <= 60; i++) {
			if (i % 5 !== 0) {
				ctx.beginPath()
				ctx.strokeStyle = this.minMarkStrokeColor
				ctx.lineWidth = this.minMarkWidth
				ctx.rotate(6 * BASE_DEGREE)
				ctx.moveTo(minMarkStartX, 0)
				ctx.lineTo(minMarkStartX - this.minMarkLength, 0)
				ctx.stroke()
				continue
			}
			ctx.rotate(6 * BASE_DEGREE)
		}
		ctx.restore()

		ctx.save()
		/**
		 * 文本标记
		 */
		ctx.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5)
		const textMarkStatRelativeX = this.innerClockRadius - this.distOfTextMark2Outline
		ctx.fillStyle = this.timeTextMarkFillColor
		ctx.font = this.timeTextMarkFont
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillText('3', textMarkStatRelativeX, 4)
		ctx.fillText('6', 0, textMarkStatRelativeX)
		ctx.fillText('9', -textMarkStatRelativeX, 4)
		ctx.fillText('12', 0, -textMarkStatRelativeX)
		ctx.restore()

		ctx.save()
		/**
		 * 秒针
		 */
		ctx.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5)
		ctx.rotate(-90 * BASE_DEGREE)
		ctx.lineWidth = this.secHandWidth
		ctx.strokeStyle = this.secHandStrokeColor
		ctx.rotate(((360 * (sec * 1000 + msec)) / 60000) * BASE_DEGREE)
		ctx.beginPath()
		ctx.moveTo(0, 0)
		ctx.lineTo(this.secHandLength, 0)
		ctx.stroke()
		ctx.closePath()
		ctx.restore()

		ctx.save()
		/**
		 * 分针
		 */
		ctx.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5)
		ctx.rotate(-90 * BASE_DEGREE)
		ctx.lineWidth = this.minHandWidth
		ctx.strokeStyle = this.minHandStrokeColor
		ctx.rotate(6 * min * BASE_DEGREE + ((6 * sec) / 60) * BASE_DEGREE)
		ctx.beginPath()
		ctx.moveTo(0, 0)
		ctx.lineTo(this.minHandLength, 0)
		ctx.stroke()
		ctx.closePath()
		ctx.restore()

		ctx.save()
		/**
		 * 时针
		 */
		ctx.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5)
		ctx.rotate(-90 * BASE_DEGREE)
		ctx.lineWidth = this.hourHandWidth
		ctx.strokeStyle = this.hourHandStrokeColor
		ctx.rotate(30 * (hour % 12) * BASE_DEGREE + ((30 * min) / 60) * BASE_DEGREE)
		ctx.beginPath()
		ctx.moveTo(0, 0)
		ctx.lineTo(this.hourHandLength, 0)
		ctx.stroke()
		ctx.closePath()
		ctx.restore()

		ctx.save()
		/**
		 * 针中心环
		 */
		ctx.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5)
		ctx.beginPath()
		ctx.fillStyle = this.centerCircleFillColor
		ctx.arc(0, 0, this.centerCircleRadius, 0, Math.PI * 2, true)
		ctx.fill()
		ctx.closePath()
		/**
		 * 针中心圆
		 */
		ctx.beginPath()
		ctx.strokeStyle = this.centerRingFillColor
		ctx.lineWidth = this.centerRingWidth
		ctx.arc(0, 0, this.centerRingInnerRadius, 0, Math.PI * 2, true)
		ctx.stroke()
		ctx.closePath()
		ctx.restore()

		ctx.save()
		/**
		 * 秒针针尾
		 */
		ctx.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5)
		ctx.rotate(-90 * BASE_DEGREE)
		ctx.beginPath()
		ctx.lineWidth = this.secHandWidth
		ctx.strokeStyle = this.secHandStrokeColor
		ctx.rotate(((360 * (sec * 1000 + msec)) / 60000) * BASE_DEGREE)
		ctx.moveTo(0, 0)
		ctx.lineTo(-this.secHandOverflowLength, 0)
		ctx.stroke()
		ctx.closePath()
		ctx.restore()

		ctx.save()
		/**
		 * 表面边框
		 */
		ctx.translate(this.canvasWidth * 0.5, this.canvasHeight * 0.5)
		const lingradOutline = ctx.createLinearGradient(this.innerClockRadius, 0, -this.innerClockRadius, 0)
		ctx.beginPath()
		ctx.lineWidth = this.clockOutlineWidth
		lingradOutline.addColorStop(0, '#C0C0C0')
		lingradOutline.addColorStop(1, '#C0C0C0')
		ctx.strokeStyle = lingradOutline
		ctx.arc(0, 0, this.innerClockRadius, 0, Math.PI * 2, true)
		ctx.stroke()
		ctx.closePath()
		ctx.restore()
	}

	public start() {
		this.clear()
		this.draw()
		this.rAFHandle = window.requestAnimationFrame(this.start.bind(this))
	}

	public stop(clear: boolean = true) {
		window.cancelAnimationFrame(this.rAFHandle)
		if (clear) {
			this.clear()
		}
	}

	public clear() {
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
	}

	public setCanvasRect(setWidth: number, setHeight: number): void {
		if (setWidth <= 0 || setHeight <= 0) {
			return
		}
		this.canvasElement.setAttribute('width', String(setWidth))
		this.canvasElement.setAttribute('height', String(setHeight))
		this.setCanvasClientRect(setWidth, setHeight)
		this.profileCorrection()
	}
}
