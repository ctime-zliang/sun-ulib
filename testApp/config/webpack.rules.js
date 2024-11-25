const jsEsbuildLoader = {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'jsx',
		target: 'es2015',
		jsxFactory: 'Sun.createElement',
		jsxFragment: 'Sun.Fragment',
	},
}
const tsEsbuildLoader = {
	test: /\.(ts|tsx)$/,
	exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'tsx',
		target: 'es2015',
		jsxFactory: 'Sun.createElement',
		jsxFragment: 'Sun.Fragment',
		tsconfigRaw: require('../../tsconfig.json'),
		minify: false,
		minifyWhitespace: false,
		sourcemap: true,
	},
}

module.exports = [jsEsbuildLoader, tsEsbuildLoader]
