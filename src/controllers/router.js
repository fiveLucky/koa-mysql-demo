const router = require('koa-router')
const URL = require('../config/URL')
const home = require('../template/home.html')

router.get(URL.home, async (ctx, next) => {
  ctx.response.type = 'text/html'
  ctx.response.body = home
})
