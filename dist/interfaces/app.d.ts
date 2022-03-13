import { VercelRequest, VercelResponse } from '@vercel/node';
export declare type AppNextFunction = () => void;
export declare type AppMiddleware = (req: VercelRequest, res: VercelResponse, next?: AppNextFunction) => any;
