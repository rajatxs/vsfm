/**
 * File: index.ts
 * Author: Rajat Sharma
 * Created: 2025-08-17 12:39 PM
 * Description: Middleware composition utility for Vercel Serverless Function
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { AppMiddleware, AppHandler, AppNextFunction } from './types';

/**
 * Compose multiple middlewares and handler into a single middleware
 * @param cbs - List of middlewares and handler
 */
export function compose(...cbs: AppMiddleware[] | AppHandler[]): AppMiddleware {
    // Check if all the callbacks are functions
    if (!cbs.every((fun) => typeof fun === 'function')) {
        throw new TypeError('Middleware must be composed of functions!');
    }

    return function (
        request: VercelRequest,
        response: VercelResponse,
        next: AppNextFunction
    ): Promise<any> {
        // last called middleware #
        let index = -1;
        return dispatch(0);

        /**
         * Dispatch the middleware
         * @param i - Current middleware index
         */
        function dispatch(i: number) {
            // Prevent multiple next() calls
            if (i <= index) {
                return Promise.reject(new Error('next() called multiple times'));
            }

            index = i;
            let fn = cbs[i];
            if (i === cbs.length) {
                fn = next;
            }

            if (!fn) {
                return Promise.resolve();
            }

            // Call the middleware
            try {
                return Promise.resolve(fn(request, response, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err);
            }
        }
    };
}

export { AppMiddleware, AppHandler, AppNextFunction };
