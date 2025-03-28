import type { Request, NextFunction, Response } from "express";
import { JWT_PUBLIC_KEY } from "./config";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.['authorization'];  
    if(!token) return res.status(401).json({message: "Unauthorized"});
    const decoded = jwt.verify(token, JWT_PUBLIC_KEY);
    console.log("token =  ", decoded);
    
    if(!decoded || !decoded.sub) return res.status(401).json({message: "Unauthorized"});
    req.userId = decoded.sub as string;
    next();
};