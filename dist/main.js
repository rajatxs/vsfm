"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = void 0;
function compose(...middlewares) {
    if (!middlewares.every(fun => typeof fun === 'function')) {
        throw new TypeError("Middleware must be composed of functions!");
    }
    return function (request, response, next) {
        let index = -1;
        return dispatch(0);
        function dispatch(i) {
            if (i <= index) {
                return Promise.reject(new Error("next() called multiple times"));
            }
            index = i;
            let fn = middlewares[i];
            if (i === middlewares.length) {
                fn = next;
            }
            if (!fn) {
                return Promise.resolve();
            }
            try {
                return Promise.resolve(fn(request, response, dispatch.bind(null, i + 1)));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
    };
}
exports.compose = compose;
