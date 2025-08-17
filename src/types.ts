/**
 * File: types.ts
 * Author: Rajat Sharma
 * Created: 2025-08-17 12:39 PM
 * Description: Type definitions for Vercel Serverless Function
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

export type AppNextFunction = () => void;
export type AppMiddleware = (req: VercelRequest, res: VercelResponse, next: AppNextFunction) => any;
export type AppHandler = (req: VercelRequest, res: VercelResponse) => any;
