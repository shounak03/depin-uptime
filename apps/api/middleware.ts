import type { Request, NextFunction, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req?.headers?.['authorization'];  
    req.userId = "1";
    next();
};