module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        common: require('path').resolve(__dirname, 'src/common')
      }
    }
  }
};
