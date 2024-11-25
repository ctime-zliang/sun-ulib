const path = require('path')
const utils = require('../utils')
const logger = require('../logger')

function DtsBundlePlugin(opt) {
	this.options = { ...opt }
}
DtsBundlePlugin.prototype.apply = function (compiler) {
	compiler.hooks.done.tap('done', async () => {
		console.log(`\n`)
		logger.trace('Building typescript type declaration file...')
		const dts = require('dts-bundle')
		dts.bundle({
			name: `sun`,
			baseDir: this.options.rootPath,
			main: path.join(this.options.rootPath, this.options.entry),
			out: path.join(this.options.rootPath, this.options.output),
			removeSource: true,
			verbose: false,
			outputAsModuleFolder: true,
		})
	})
	compiler.hooks.done.tap('finish', () => {
		console.log(`\n`)
		logger.trace('Cleaning up temporary directory...')
		utils.deleteFolderRecursive(this.options.rootPath)
		logger.trace('Build successful!')
	})
}

module.exports = {
	DtsBundlePlugin,
}
