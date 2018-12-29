var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		index: path.join(__dirname, './src/js/index.js')
	},
	output: {
		filename: 'build.js',
		path: path.join(__dirname, '/built/js/')
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [{loader: 'html-loader', options: {minimize:false}}]
			},
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Numbers',
			filename: '../index.html',
			template: './src/index.html'
		}),
		new webpack.ProvidePlugin({
			'React' : 'react'
		})
	]
};
