// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../manage/index.html'),
        assetsRoot: path.resolve(__dirname, '../manage'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/manage/',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // proxyTable: {
        //     '/api': {
        //         target:'http://49.234.85.135:7001/v1', // 你请求的第三方接口
        //         changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        //         pathRewrite:{  // 路径重写，
        //             '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
        //         }
        //     },
        //     cssSourceMap: false
            proxyTable: {
                "/api": {
                    target: 'http://49.234.85.135:7001',//后端接口地址
                    changeOrigin: true,//是否允许跨越
                    pathRewrite: {
                        // '^/v1': '/v1',//重写,
                        '^/api': ''
                    },
                    secure: false
            }
        },
        context: [
        ],
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
