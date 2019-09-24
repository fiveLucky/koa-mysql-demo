const Koa = require("koa");

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.log("error");

    ctx.body = "hello world!";
  }
});

app.use((ctx, next) => {
  console.log("fffff");
  return next();
});
app.use(() => {
  throw new Error("sdfd");
});

app.listen(3000);
