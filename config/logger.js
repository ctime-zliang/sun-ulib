const TYPE = {
	TRACE: 'TRACE',
	ERROR: 'ERROR',
	INFO: 'INFO',
}

const write = (type, message, ucolor = '') => {
	let color = `[34m`
	if (type == TYPE.TRACE) {
		color = color.indexOf('[34m') > -1 ? `[35m` : `[34m`
		ucolor = color
	}
	console.log(`\x1b${ucolor} [${type}] ${message}\x1b${ucolor}`)
}
const error = (action, message = '') => {
	write(TYPE.ERROR, `[${action}][${typeof message == 'object' ? JSON.stringify(message) : message}]`, `[31m`)
}
const trace = (action, message = '') => {
	write(TYPE.TRACE, `[${action}][${typeof message == 'object' ? JSON.stringify(message) : message}]`)
}
const log = (...args) => {
	console.log(...args)
}

module.exports = {
	error,
	trace,
	log,
}
