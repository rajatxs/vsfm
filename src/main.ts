import { VercelRequest, VercelResponse } from '@vercel/node'
import { AppMiddleware, AppNextFunction } from './interfaces/app'

/** Middleware composition */
export function compose(...middlewares: AppMiddleware[]): AppMiddleware {
   if (!middlewares.every(fun => typeof fun === 'function')) {
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
         let fn = middlewares[i]
         if (i === middlewares.length) {
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
   AppNextFunction
}
