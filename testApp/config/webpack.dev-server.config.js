const path = require('path')

module.exports = {
	contentBase: path.join(__dirname, '/src/'),
	disableHostCheck: true,
	host: '127.0.0.1',
	port: 8088,
	compress: true,
	progress: true,
	hot: true,
	open: false,
	inline: true,
	watchContentBase: true,
	historyApiFallback: true,
	writeToDisk: false,
	headers: {
		Cookie: `sessionKey=webpacdevsessionKey; PATH=/;`,
	},
}
