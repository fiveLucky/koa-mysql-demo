const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  await next()
  ctx.response.type = 'text/html'
  ctx.response.body = '<h1>hello world!</h1>'
})

app.listen(3000)
console.log('server is running at port 3000')