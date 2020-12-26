module.exports = {
  //配置跨域代理  开发时候
  devServer: {
    // Paths
    host: '192.168.1.140',
    port: '8081',
    https: false,
    open: true,
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'https://api.weixin.qq.com', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    },
  }

}