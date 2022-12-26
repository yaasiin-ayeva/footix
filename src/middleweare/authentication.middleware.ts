import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken"
import Env from "../conf/config";

export default async function authenticationMiddleware(req: any, res: Response, next: NextFunction) {
    try {

        const authorizationToken = (req.headers.authorization.split(" ")[1] as string) || null
        if (!authorizationToken) {
            next(new Error("Missing authorization token"))
        }

        jwt.verify(authorizationToken, Env.key, function (error, decodedToken) {
            if (error) {
                next(new Error("Unauthorized user"))
            }

            req.user = decodedToken
            next()
        })

    } catch (e) {
        next(new Error("Wrong authorization token"))
    }
}