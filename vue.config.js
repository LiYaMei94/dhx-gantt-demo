module.exports = {
  configureWebpack: {},
  publicPath: "./",
  outputDir: `dist/gantt-demo`,
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      filename: "index.html",
      title: "oneapp",
    },
  },
  devServer: {
    port: 8080,
    open: true,
    // proxy: {
    //   // 第一台服务器配置
    //   '/api': {
    //     target: 'http://10.0.4.81:8888/',
    //     ws: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   },
    //   // 第二台服务器配置(边界测算)
    //   '/': {
    //     target: 'http://47.101.10.176:9000',
    //     ws: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/': '/'
    //     }
    //   }
    // }
  },
  lintOnSave: false,
  css: {},
};
