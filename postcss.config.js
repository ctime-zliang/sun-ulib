/*
	postcss-loader 将调用 postcss 提供的能力对 css 字符串做预处理
	postcss 对 css 的处理:
		将 css 转换成 AST
			1. Tokenizer - 将源 css 字符串分词, 得到 tokens 序列
			2. Parser - 将 tokens 序列转成 AST
			3. Processor - 提供适用于外部插件的 JS API, 并将 AST 传递给各插件处理
				plugins in postcss.config.js
			4. Stringifier - 重新转成 css 字符串, 并添加特殊处理(前缀等等)
		postcss-loader 处理完毕后将处理结果传递给下一个 loader 处理
 */

module.exports = () => {
	// api
	return {
		/* 在 CSS-in-JS 中启用/禁用 PostCSS Parser 支持 */
		// execute: true,
		sourceMap: true,
		plugins: [
			/*
				添加前缀 
			 */
			require('autoprefixer'),
			require('postcss-import'),
			require('postcss-nested'),
			require('postcss-flexbugs-fixes'),
			/*
				预设环境特性
					- 新语法支持
					- polyfill
			 */
			require('postcss-preset-env'),
			require('postcss-custom-properties'),
			require('postcss-assets'),
			/*
				自定义插件 
			 */
			require('./webpack/config/user-postcss-plugins/postcss-hex-2-rgba'),
		],
	}
}
