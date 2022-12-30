import { NextFunction, Request, Response } from "express";
import AuthenticatedUser from "../interface/authenticatedUser";
import { RoleService } from "../service/role.service";

export default class RoleController {
    private readonly service: RoleService

    constructor() {
        this.service = new RoleService()
    }

    public createHandler = async (req: any, res: Response, next: NextFunction) => {
        try {
            const role = await this.service.create(req.body)
            return res.status(201).json({
                message: 'role created',
                data: role
            })
        } catch (e) {
            next(new Error(e.message))
        }
    }

    public loadAllHandler = async (req: AuthenticatedUser, res: Response, next: NextFunction) => {
        try {
            const data = await this.service.loadAll()
            return res.status(200).json({
                message: 'success',
                data: data
            })
        } catch (e) {
            next(new Error(e.message))
        }
    }

    public deleteHandler = async (req: any, res: Response, next: NextFunction) => {
        try {
            const data = await this.service.delete(req.params.id)
            if (data.affected === 0) {
                return res.status(404).json({
                    message: 'Role not found'
                })
            } else if (data.affected === 1) {
                return res.status(200).json({
                    message: 'success',
                    data: data
                })
            }
        } catch (e) {
            next(new Error(e.message))
        }
    }
}