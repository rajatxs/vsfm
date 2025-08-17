# VSFM - Vercel Serverless Function Middleware

A lightweight middleware composition utility for Vercel Serverless Functions, inspired by Koa's middleware system but designed specifically for Vercel's serverless environment.

## Installation

```bash
npm install @rxpm/vsfm
# or
yarn add @rxpm/vsfm
```

## Features

- 🚀 Simple and lightweight middleware composition
- 🔄 Async/await support
- 🛡️ TypeScript support out of the box
- 🔄 Chainable middleware execution
- 🛠️ Error handling built-in

## Usage

### Basic Example

```typescript
import { compose } from '@rxpm/vsfm';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Middleware functions
const logger = async (req: VercelRequest, res: VercelResponse, next: () => void) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    await next();
};

const auth = async (req: VercelRequest, res: VercelResponse, next: () => void) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    await next();
};

// Your main handler
const handler = async (req: VercelRequest, res: VercelResponse) => {
    res.status(200).json({ message: 'Hello, World!' });
};

// Compose middlewares with handler
export default compose(logger, auth, handler);
```

### TypeScript Support

VSFM includes TypeScript type definitions out of the box. Here are the available types:

```typescript
import type { AppMiddleware, AppHandler, AppNextFunction } from '@rxpm/vsfm';

// AppMiddleware: Type for middleware functions
// AppHandler: Type for request handler functions
// AppNextFunction: Type for the next() function
```

## API Reference

### `compose(...middlewares: (AppMiddleware | AppHandler)[]): AppMiddleware`

Composes multiple middleware functions into a single middleware function.

#### Parameters

- `...middlewares`: An array of middleware functions or handler functions to be composed.

#### Returns

A new middleware function that executes all provided middlewares in sequence.

## Error Handling

Errors in middleware can be caught using try/catch blocks. If a middleware throws an error, the execution will stop, and the error will be propagated to the Vercel runtime.

```typescript
const errorHandler = async (req: VercelRequest, res: VercelResponse, next: () => void) => {
    try {
        await next();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Use as the first middleware
export default compose(errorHandler, logger, auth, handler);
```

## Best Practices

1. **Order Matters**: Middleware executes in the order they are composed. Place error handlers and essential middleware first.
2. **Always Call next()**: Don't forget to call `await next()` in your middleware unless you're intentionally ending the request-response cycle.
3. **Error Handling**: Implement proper error handling in your middleware.
4. **Keep Middleware Focused**: Each middleware should have a single responsibility.

## License

ISC © [Rajat Sharma](https://gitlab.com/rajatxs)
