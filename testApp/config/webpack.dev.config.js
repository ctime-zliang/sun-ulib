const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackLibInitConfig = require('./webpack.init.config')
const rules = require('./webpack.rules')
const webpackLibDevServerConfig = require('./webpack.dev-server.config')
const utils = require('../../config/utils')

const webpackModule = webpackLibInitConfig.module
delete webpackLibInitConfig.module
const webpackConfig = {
	target: 'web',
	mode: 'development',
	entry: {
		main: utils.resolveDirectory(`./testApp/src/index.jsx`),
	},
	output: {
		path: utils.resolveDirectory(`./testApp/build`),
		filename: `[name].js`,
	},
	module: {
		...webpackModule,
		rules: rules,
	},
	devServer: webpackLibDevServerConfig,
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			filename: `./index.html`,
			template: utils.resolveDirectory(`./testApp/src/template/index.ejs`),
			inject: true,
		}),
	],
}

module.exports = merge(webpackConfig, webpackLibInitConfig)
