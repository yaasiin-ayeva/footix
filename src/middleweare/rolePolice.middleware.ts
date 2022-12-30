import { NextFunction, Response } from "express";
import AuthenticatedUser from "../interface/authenticatedUser";

export default async function rolePoliceMiddleware(req: AuthenticatedUser, res: Response, next: NextFunction) {
    const role = req.user.role;
    if (role.name !== "Admin") {
        next(new Error("Unauthorized. You must be an admin to perform this action."));
    }
    next();
}