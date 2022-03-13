import { VercelRequest, VercelResponse } from '@vercel/node'

export type AppNextFunction = () => void

export type AppMiddleware = (
   req: VercelRequest, 
   res: VercelResponse, 
   next?: AppNextFunction
) => any
