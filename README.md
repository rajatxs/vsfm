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
