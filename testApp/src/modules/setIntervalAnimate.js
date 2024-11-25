import { intervalAnimate } from '../utils/utils'

const cache = {}

function initView() {
	const topContainer = document.getElementById('area1')
	topContainer.innerHTML = `
        <div style="position: relative; height: 150px;">
            <div id="animateBox" style="position: absolute; width: 100px; height: 100px; background: red;"></div>
        </div>
    `
}

function move() {
	intervalAnimate(cache.element, 'width', 800, () => {
		intervalAnimate(cache.element, 'width', 100, move)
	})
}

function startMove() {
	cache.element = document.querySelector(`#animateBox`)
	move()
}

export function setIntervalAnimateMain() {
	initView()
	startMove()
}
