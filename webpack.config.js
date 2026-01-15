const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
            '@containers': path.resolve(__dirname, 'src/js/containers/'),
            '@components': path.resolve(__dirname, 'src/js/components/'),
            '@data': path.resolve(__dirname, 'src/js/data/'),
            '@icons': path.resolve(__dirname, 'src/js/icons/'),
            '@model': path.resolve(__dirname, 'src/js/model/'),
            '@root': path.resolve(__dirname, 'src/js/'),
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
                test: /\.jsx?$/,
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Numbers',
            filename: 'index.html',
            template: './src/index.html',
            alwaysWriteToDisk: true,
        }),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new MiniCssExtractPlugin({
            filename: './css/style.css',
        }),
    ],
};
