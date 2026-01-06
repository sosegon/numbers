const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, './src/js/index.js'),
    },
    output: {
        filename: './js/bundle.js',
        path: path.join(__dirname, './built'),
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, './built'),
            watch: true,
        },
    },
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, 'src/js/'),
            '@components': path.resolve(__dirname, 'src/js/components/'),
            '@containers': path.resolve(__dirname, 'src/js/containers/'),
            '@data': path.resolve(__dirname, 'src/js/data/'),
            '@model': path.resolve(__dirname, 'src/js/model/'),
            '@icons': path.resolve(__dirname, 'src/js/icons/'),
            '@style': path.resolve(__dirname, 'src/style/'),
            '@test': path.resolve(__dirname, 'src/js/test/'),
        },
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader', options: { minimize: false } }],
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-class-properties'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'css/[name][ext]',
                },
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {},
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Numbers',
            filename: 'index.html',
            template: './src/index.html',
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new MiniCssExtractPlugin({
            filename: './css/style.css',
        }),
    ],
};
