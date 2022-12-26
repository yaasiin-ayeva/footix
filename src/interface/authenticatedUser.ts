import { Request } from "express";

export default interface AuthenticatedUser extends Request {
    user: any
}