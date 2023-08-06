import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { AppMiddleware, AppHandler, AppNextFunction } from './types'

/**
 * Middleware composition 
 * @param cbs - List of middlewares and handler
 */
export function compose(...cbs: AppMiddleware[] | AppHandler[]): AppMiddleware {
   if (!cbs.every(fun => typeof fun === 'function')) {
      throw new TypeError("Middleware must be composed of functions!")
   }

   return function (request: VercelRequest, response: VercelResponse, next: AppNextFunction): Promise<any> {

      // last called middleware #
      let index = -1
      return dispatch(0)

      function dispatch(i: number) {
         if (i <= index) {
            return Promise.reject(new Error("next() called multiple times"))
         }

         index = i
         let fn = cbs[i]
         if (i === cbs.length) {
            fn = next
         }

         if (!fn) {
            return Promise.resolve()
         }

         try {
            return Promise.resolve(fn(request, response, dispatch.bind(null, i + 1)))
         } catch (err) {
            return Promise.reject(err)
         }
      }
   }
}

export {
   AppMiddleware,
   AppHandler,
   AppNextFunction
}
