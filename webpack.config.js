const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

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
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sourceMapContents: false
						}
					},
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: 'file-loader',
				options: {
					outputPath: '../css',
				}
			},
			{
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
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
		}),
		new MiniCssExtractPlugin({
			filename: '../css/style.css'
		}),
		new CopyWebpackPlugin([
			{from: './src/images', to: '../images'}
		]),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			proxy: 'http://localhost:8080/'
		})

	]
};
