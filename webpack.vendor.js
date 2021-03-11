
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackbar = require('webpackbar')
module.exports = {
    mode: 'development',
    entry: {
        vendor: ['axios', 'element-ui', 'vue', 'vuex', 'vue-router', 'date-fns', '@babel/polyfill', 'echarts', 'pannellum'],
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]',
    },
    plugins: [
        new CleanWebpackPlugin(),//clean dist
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dist', '[name].manifest.json'),
        }),
        new webpackbar({
            name: "正在提取依赖...",
        }),
    ],
};