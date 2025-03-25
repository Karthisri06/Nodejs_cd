import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: number, name: string, email: string };
        req.user = decoded; // Add the decoded user data to the request object
        next(); // Allow access to the next middleware or route
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
