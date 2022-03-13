import { AppMiddleware, AppNextFunction } from './interfaces/app';
export declare function compose(...middlewares: AppMiddleware[]): AppMiddleware;
export { AppMiddleware, AppNextFunction };
