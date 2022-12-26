import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import UpdateUserPictureDto from "../dto/user/update-picture.dto";
import UpdateUserRoleDto from "../dto/user/update-role.dto";
import { User } from "../entity/user.entity";

export class UserService {

    private readonly repository: Repository<User>

    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }

    public async loadUser(authenticatedUser: any) {
        return await this.repository.createQueryBuilder("user")
            .leftJoinAndSelect("user.role", "role")
            .where("user.id = :id", { id: authenticatedUser.id })
            .getOne()
    }

    public async updatePicture(authenticatedUser: any, data: UpdateUserPictureDto) {
        return await this.repository.createQueryBuilder()
            .update(User)
            .set({
                picture: data.picture
            })
            .where("user.id = :id", { id: authenticatedUser.id })
            .execute()
    }

    public async updateRole(authenticatedUser: any, data: UpdateUserRoleDto) {
        return await this.repository.createQueryBuilder()
            .update(User)
            .set({
                role: data.role
            })
            .where("user.id = :id", { id: data.id })
            .execute()
    }

    public async loadUserById(id: number) {
        return await this.repository.createQueryBuilder("user")
            .leftJoinAndSelect("user.role", "role")
            .where("user.id = :id", { id: id })
            .getOne()
    }

    public async deleteUser(authenticatedUser: any, id: number) {
        return await this.repository.delete(id)
    }
}