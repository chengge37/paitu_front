const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('../config')
const utils = require('./utils')
const webpackbar = require('webpackbar')
const HappyPack = require('happypack')
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        // app: ['babel-polyfill', './src/main.js']
        app: './src/main.js'
    },
    output: {
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].bundle.js'),
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        },
        {
            test: /\.js$/,
            include: [
                resolve('src'),
                //     resolve('/node_modules/element-ui/src'),
                //     resolve('/node_modules/element-ui/packages'),
                //     resolve('/node_modules/vuejs-clipper/src'),
                //     resolve('/node_modules/webpack-dev-server/client'),
            ],
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            ),
            use: {
                loader: 'happypack/loader?id=happyBabel'
            }
        },
        {
            test: /\.(gif|png|jpe?g|svg)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: utils.assetsPath('img/[name]-[hash:8]-paitume.[ext]')
                }
            }]
        }, {
            test: /\.(woff|woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: utils.assetsPath('fonts/[name]-[hash:8]-paitume.[ext]')
            }
        }
        ]
    },
    plugins: [
        new webpackbar({
            name: "paitume-front",
        }),
        new VueLoaderPlugin(),
        new HappyPack({
            // id标识happypack处理了什么文件
            id: 'happyBabel',
            // 当前id使用loader，配置同原本得rules
            loaders: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }],
            //共享进程池
            threadPool: happyThreadPool
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '~': resolve('node_modules'),
            "@images": resolve("src/assets/images"),
            "@js": resolve("src/assets/js"),
            "@css": resolve("src/assets/css"),
            '@util': resolve('src/util'),
            '@config': resolve('src/config'),
            '@serve': resolve('src/views/pages/serve_page'),
            '@front': resolve('src/views/pages/front_page'),
            'ServeComponents': '@serve/components',
            'ServePage': '@serve/views',
            'FrontComponents': '@front/components',
            'FrontPage': '@front/views',
        }
    },
};