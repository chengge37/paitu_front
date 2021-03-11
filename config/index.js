'use strict'
const path = require('path')

module.exports = {
    dev: {

        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target: 'http://192.168.0.2:9527',
                // target: 'https://www.paitume.com',
                //              target: 'http://test.paitume.com',
                changeOrigin: true,//传递给后端正确的Host头 true:target host、 false为localhost
                secure: true //支持 https
            },
        },
        devtool: 'cheap-module-eval-source-map',
        host: '0.0.0.0',
        port: 1113,
        // 是否自动打开浏览器
        autoOpenBrowser: false,
        // 出现错误时,是否全屏遮罩显示错误
        errorOverlay: true,
        // 是否启动错误提示(边缘弹窗)
        notifyOnErrors: true,
        // 是否启动毫秒级webpack轮训检查文件是否变更(当且仅当webpack热更新失效时开启,其他情况请勿使用)
        // 接受false和毫秒数
        poll: false,
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // 此处决定打包的文件夹
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        /**
         * 打包时是否启用map
         */

        productionSourceMap: false,
        devtool: '#source-map',

        // 此处配置是是否启动webpack打包检测你可以通过使用以下命令进行启动
        // `npm run build --report`
        // 或者你也可以直接设置true或者false来直接进行控制
        bundleAnalyzerReport: process.env.npm_config_report,
        // 此处配置是是否使用gzip功能对代码进行高强度的压缩(值得注意的是gzip功能需要nginx做出对应的配置,谨慎开启)
        gzip: true,
        // 这里设置需要被压缩的文件后缀默认是只压缩css和js
        productionGzipExtensions: ['js', 'css', 'svg'],
        // 是否开启自动部署
        AutoUpload:false
    }
}
