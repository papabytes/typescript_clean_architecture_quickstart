import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.status(500).json({
            error: err.message
        })
        next(err);
    }
}