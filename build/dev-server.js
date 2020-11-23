require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

var context = config.dev.context

switch(process.env.NODE_ENV){
    case 'local': var proxypath = 'api'; break;
    case 'online': var proxypath = 'http://cangdu.org:8001'; break;
}
var options = {
    target: proxypath,
    changeOrigin: true,
}
if (context.length) {
    app.use(proxyMiddleware(context, options))
}
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
// require('./check-versions')()
//
// var config = require('../config')
// if (!process.env.NODE_ENV) {
//     process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
// }
// // opn插件是用来打开特定终端的，此文件用来在默认浏览器中打开链接 opn(url)
// var opn = require('opn')
// var path = require('path')// nodejs开发框架express，用来简化操作，有兴趣可以自行去了解
// var express = require('express')// 引入webpack模块，用来使用webpack内置插件
// var webpack = require('webpack')// 引入http-proxy-middleware插件，此插件是用来代理请求的只能用于开发环境，目的主要是解决跨域请求后台api
// var proxyMiddleware = require('http-proxy-middleware')
// var webpackConfig = require('./webpack.dev.conf')//==========================================================
// var mockQueryCode = require('../mock/querySecuritiesCode')
// var cookiejar = require('cookiejar')
// var fs = require('fs')
// var https = require('https')
// //==========================================================
// // default port where dev server listens for incoming traffic// 下面是webpack-dev-server 监听的端口号，因为没有设置process.env.PORT，所以下面监听的就是config.dev.port即443
// var port = process.env.PORT || config.dev.port
// // automatically open browser, if not set will be false// 下面是true,至于为啥，本来就是true还要加!!两个感叹号，估计是vue作者装了个逼吧
// var autoOpenBrowser = !!config.dev.autoOpenBrowser
// // Define HTTP proxies to your custom API backend
// // https://github.com/chimurai/http-proxy-middleware// 下面是解决开发环境跨域问题的插件，我在config目录index.js文章中有介绍，自行查看
// var proxyTable = config.dev.proxyTable
//
// //======================================================================
// // 注释https服务器，改回http服务器
// //配置https服务器证书和秘钥
// var httpsOptions = {
//     key: fs.readFileSync('./ssl/server.key'),
//     cert: fs.readFileSync('./ssl/server.crt')
// }
// //======================================================================// 下面是创建node.js的express开发框架的实例，别问我为什么这样，自己看node.js去吧
// var app = express()//把配置参数传递到webpack方法中，返回一个编译对象，这个编译对象上面有很多属性，自己去看吧，主要是用到里面的状态函数 如compilation，compile，after-emit这类的
// var compiler = webpack(webpackConfig)
// // 下面是webpack-dev-middleware和webpack-hot-middleware两兄弟，这两个是黄金组合 // 而vue作者用这两个插件也是用的最基本的形式，详情看(1) (2)
// var devMiddleware = require('webpack-dev-middleware')(compiler, {
//     publicPath: webpackConfig.output.publicPath,
//     quiet: true //// 使用friendly-errors-webpack-plugin插件这个必须设置为true，具体看我的wepback-dev-config.js
// })
//
// var hotMiddleware = require('webpack-hot-middleware')(compiler, {
//     log: () => {}
// })
// // force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function (compilation) {// webpack任何一个插件都plugin这个方法，里面可以传递钩子函数，用来在插件各个阶段做特殊处理，钩子函数种类很多
//     compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {// 当插件html-webpack-plugin产出完成之后，强制刷新浏览器
//         hotMiddleware.publish({ action: 'reload' })
//         cb()
//     })
// })
//
//
// function relayRequestHeaders(proxyReq, req) {
//     Object.keys(req.headers).forEach(function (key) {
//         proxyReq.setHeader(key, req.headers[key]);
//     });
// }
//
// function relayResponseHeaders(proxyRes, req, res) {
//     var setCookieHeaders = proxyRes.headers['set-cookie'] || [];
//     var modifiedSetCookieHeaders = setCookieHeaders
//         .map(str => new cookiejar.Cookie(str))
//         .map(cookie => {
//             //if (cookie.path && cookie.path[0] === '/') {
//             cookie.path = '/api'
//             //}
//             return cookie
//         })
//         .map(cookie => cookie.toString());
//     proxyRes.headers['set-cookie'] = modifiedSetCookieHeaders;
// }
//
// // proxy api requests
// Object.keys(proxyTable).forEach(function (context) {// 下面是代理表的处理方法，看看就行了，几乎用不上，除非你是全栈，不用webpack-dev-server，使用后台语言做服务器
//     var options = proxyTable[context]
//     if (typeof options === 'string') {
//         options = { target: options }
//     }
//
//     options.onProxyReq=relayRequestHeaders;
//     options.onProxyRes=relayResponseHeaders;
//
//     app.use(proxyMiddleware(options.filter || context, options))
// })
//
// app.use('/mock', mockQueryCode)
//
// // handle fallback for HTML5 history API// 这个插件是用来解决单页面应用，点击刷新按钮和通过其他search值定位页面的404错误 // 详情请看(3)
// app.use(require('connect-history-api-fallback')())
//
// // serve webpack bundle output// app.use是在响应请求之前执行的，用来指定静态路径，挂载静态资源
// app.use(devMiddleware)
//
// // enable hot-reload and state-preserving
// // compilation error display
// app.use(hotMiddleware)
//
//
// // serve pure static assets
// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)// 挂载静态资源，下面的方法是用虚拟目录来访问资源，staticPath就是虚拟目录路径，其实不管设不设置都是static
// app.use(staticPath, express.static('./static'))
//
// //mock 数据
// //app.use(staticPath,express.static('./mock'))
//
//
// var uri = 'https://localhost:' + port ;
//
// var _resolve
// var readyPromise = new Promise(resolve => {
//     _resolve = resolve
// })
//
// console.log('> Starting dev server...')// waitUntilValid是webpack-dev-middleware实例的方法，在编译成功之后调用
// devMiddleware.waitUntilValid(() => {
//     console.log('> Listening at ' + uri + '\n')
//     // when env is testing, don't need open it
//     if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
//         opn(uri)
//     }
//     _resolve()
// })
//
// //var server = app.listen(port)
// //启动https服务器
// var server = https.createServer(httpsOptions,app);
// server.listen(port);
//
// module.exports = {  ready: readyPromise,   // promise实例，可以通过readyPromise.then收到数据
//     close: () => {
//         server.close()      // 关闭服务器
//     }
// }
