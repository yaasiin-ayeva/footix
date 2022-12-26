import { NextFunction, Response } from "express";
import AuthenticatedUser from "../interface/authenticatedUser";

export default async function roleCheckingMiddleware(req: AuthenticatedUser, res: Response, next: NextFunction) {
    const role = req.user.role;
    if (role.name !== "Admin") {
        next(new Error("Unauthorized Type of User. You are not an Admin!"));
    }
    next();
}