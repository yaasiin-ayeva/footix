import { Role } from "../../entity/role.entity"

export default interface UpdateUserRoleDto {
    id: number
    role: Role
}
