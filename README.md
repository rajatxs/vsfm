# Middleware composition utility

Compose middleware for Vercel Serverless Function.

### Installation
```bash
$ npm install @rxpm/vsfm
```

### API

Compose list of middleware to get root middeware
```javascript
compose(handler1, handler2, ..., handlerN)
```

### Example

Using multiple middlewares and single handler
```javascript
const middleware1: AppMiddleware = (req, res, next) => {
   console.log("executing middleware 1")
   next()
}

const middleware2: AppMiddleware = (req, res, next) => {
   console.log("executing async middleware 2")
   return new Promise(() => {
      setTimeout(() => {
         next()
      }, 3000)
   })
}

const handler: AppHandler = (req, res) => {
   console.log("executing handler")
   res.send("Done")
}

compose(middleware1, middleware2, handler)
```
