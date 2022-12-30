import { Role } from "../../entity/role.entity"

export default interface Register {
    username: string
    password: string
    firstname: string
    lastname: string
    picture: string
    role: Role
}