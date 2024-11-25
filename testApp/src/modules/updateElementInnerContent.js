const cache = {
	isAppend: true,
}

function initView() {
	const topContainer = document.getElementById('area2')
	topContainer.innerHTML = `
        <div>
            <button id="batchBtn">Batch Update Btn</button>
            <ul id="ulistWrapper"></ul>
        </div>
    `
}

function bindEvent() {
	const btnElement = document.getElementById('batchBtn')
	btnElement.addEventListener('click', function (e) {
		updateInnerContent()
	})
}

function updateInnerContent() {
	const ulistWrapperElement = document.getElementById('ulistWrapper')
	const random = Math.random() + ''
	if (cache.isAppend) {
		let htmlString = ``
		for (let i = 0; i < 10000; i++) {
			htmlString += `<li>${random}</li>`
		}
		ulistWrapperElement.innerHTML = htmlString
		cache.isAppend = false
		return
	}
	const allLiElements = ulistWrapperElement.querySelectorAll('li')
	const arrAllLiElements = Array.from(allLiElements)
	for (let i = 0; i < arrAllLiElements.length; i++) {
		arrAllLiElements[i].childNodes[0].nodeValue = random
	}
}

export function updateInnerContentMain() {
	initView()
	bindEvent()
}
