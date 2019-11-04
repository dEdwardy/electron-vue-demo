const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  chainWebpack:(config) => {
    config.resolve.alias
      .set('@',resolve('src'))
      .set('api',resolve('src/api'))
      .set('view',resolve('src/view'))
      .set('assets',resolve('src/assets'))
      .set('components',resolve('src/components'))
  },
  
}