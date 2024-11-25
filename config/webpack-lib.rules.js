const path = require('path')

const jsEsbuildLoader = {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'jsx',
		target: 'es2015',
		jsxFactory: 'Sun.createElement',
		jsxFragment: 'Sun.Fragment',
		tsconfigRaw: require('../tsconfig.json'),
	},
}

const tsEsbuildLoader = {
	test: /\.(ts|tsx)$/,
	exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'jsx',
		target: 'es2015',
		jsxFactory: 'Sun.createElement',
		jsxFragment: 'Sun.Fragment',
		tsconfigRaw: require('../tsconfig.json'),
		minify: false,
		minifyWhitespace: false,
		sourcemap: true,
	},
}

const tsLoader = {
	test: /\.(ts|tsx)$/,
	exclude: /node_modules/,
	loader: 'ts-loader',
	options: {
		configFile: 'tsconfig.json',
		// configFile: path.resolve(process.cwd(), './tsconfig.json')
	},
}

module.exports = type => {
	return {
		libProdBuild: {
			oneOf: [jsEsbuildLoader, tsLoader],
		},
		libDevBuild: {
			oneOf: [jsEsbuildLoader, tsLoader],
		},
	}[type]
}
