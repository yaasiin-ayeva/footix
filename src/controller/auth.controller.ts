import { NextFunction, Request, Response } from "express";
import AuthService from "../service/auth.service";

export default class AuthController {
    private readonly service: AuthService

    constructor() {
        this.service = new AuthService()
    }

    public registerHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const registration = await this.service.register(req.body)
            return res.status(201).json({
                message: 'user created',
                data: registration
            });
        } catch (e) {
            next(new Error(e.message))
        }
    }

    public loginHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const login = await this.service.login(req.body)
            return res.status(200).json({
                message: 'success',
                data: login
            })
        } catch (e) {
            next(new Error(e.message))
        }
    }
}