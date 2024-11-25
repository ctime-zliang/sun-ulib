const { merge } = require('webpack-merge')
const webpackLibInitConfig = require('./webpack-lib.init.config')
const rules = require('./webpack-lib.rules')
const utils = require('./utils')

const webpackInitModule = webpackLibInitConfig.module
delete webpackLibInitConfig.module
const webpackConfig = {
	mode: 'production',
	entry: {
		main: utils.resolveDirectory(`./src/index.ts`),
	},
	output: {
		path: utils.resolveDirectory(`./build`),
		filename: `sun.js`,
		libraryExport: 'default',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	module: {
		...webpackInitModule,
		rules: [rules('libProdBuild')],
	},
	devtool: 'source-map',
}

module.exports = merge(webpackConfig, webpackLibInitConfig)
