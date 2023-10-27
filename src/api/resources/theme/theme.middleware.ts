import { NextFunction, Request, Response } from "express-serve-static-core";

export function myTest(req: Request, response: Response, next: NextFunction) {
    console.log('req: ', req);
    return next();
}