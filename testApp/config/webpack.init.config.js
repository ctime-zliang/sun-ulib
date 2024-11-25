const path = require('path')
const webpack = require('webpack')
const { ESBuildPlugin } = require('esbuild-loader')
const utils = require('../../config/utils')

const webpackConfigBase = {
	target: 'web',
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.jsx'],
		alias: {
			'@': utils.resolveDirectory('./src/'),
		},
	},
	module: {},
	plugins: [new ESBuildPlugin(), new webpack.ProgressPlugin()],
}

module.exports = webpackConfigBase
