import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import CreateRoleDto from "../dto/role/create.dto";
import { Role } from "../entity/role.entity";

export class RoleService {

    private readonly repository: Repository<Role>

    constructor() {
        this.repository = AppDataSource.getRepository(Role)
    }

    public async create(data: CreateRoleDto) {
        return await this.repository.save(data)
    }

    public async loadAll() {
        return await this.repository.find()
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }
}