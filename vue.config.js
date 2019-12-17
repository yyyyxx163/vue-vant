// var path = require('path');

// module.exports = {
//     lintOnSave: false,
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: 'http://192.168.3.3',
//                 changeOrigin: true,
//                 ws: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }
//     },
// }


const port = process.env.port || 9090;
const path = require('path');

// function resolve(dir){
//   return path.join(__dirname, dir)
// }

module.exports = {
  lintOnSave: false,
  devServer: {
    port, // 端口号
    open: true,  // 运行直接打开
    overlay: {  // 错误显示在页面
      warnings: false,  // 提醒
      errors: true  // 错误
    },
    // 设置代理
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:8000/mock',
        changeOrigin: true,
        pathRewrite: {
          [process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  // 设置路径别名
  // configureWebpack: {
  //   name: 'vue-vant',
  //   resolve: {
  //     alias: {
  //       '@': resolve('src'),
  //       'views': resolve('src/views'),
  //       'components': resolve('src/components'),
  //       'common': resolve('src/common'),
  //       'router': resolve('src/router'),
  //       'store': resolve('src/store'),
  //       'utils': resolve('src/utils'),
  //       'api': resolve('src/api')
  //     }
  //   }
  // }
};
