import { NextFunction, Request, Response } from "express";
import AuthenticatedUser from "../interface/authenticatedUser";
import { UserService } from "../service/user.service";

export default class UserController {
    private readonly service: UserService

    constructor() {
        this.service = new UserService()
    }

    public loadUserHandler = async (req: AuthenticatedUser, res: Response, next: NextFunction) => {
        try {
            const data = await this.service.loadUser(req.user)
            return res.status(200).json({
                message: 'success',
                data: data
            })
        } catch (e) {
            next(new Error(e.message))
        }
    }

    public loadUserByIdHandler = async (req: any, res: Response, next: NextFunction) => {
        try {
            const user = await this.service.loadUserById(req.params.id)
            return res.status(200).json({
                message: 'success',
                data: user
            })
        } catch (e) {
            next(new Error(e.message))
        }
    }

    public deleteUserHandler = async (req: any, res: Response, next: NextFunction) => {
        try {
            const update = await this.service.deleteUser(req.user, req.params.id)
            if (update.affected === 0) {
                return res.status(404).json({
                    message: 'User not found'
                })
            } else if (update.affected === 1) {
                return res.status(200).json({
                    message: 'success',
                    data: update
                })
            }
        } catch (e) {
            next(new Error(e.message))
        }
    }
}