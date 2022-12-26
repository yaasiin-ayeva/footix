import { Role } from "../../entity/role.entity"

export default interface CreateUserDto {
    username: string
    password: string
    firstname: string
    lastname: string
    picture: string
    role: Role
}