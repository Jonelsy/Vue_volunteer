const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  pluginOptions:{
    'style-resources-loader':{
      preProcessor: 'scss',
      patterns: []
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/style/varibal.scss";`
      }
    }
  },
  devServer:{
    client: {
      overlay:false,
    }
  }
})
