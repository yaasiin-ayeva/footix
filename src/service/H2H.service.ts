import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { H2H } from "../entity/H2H.entity"


export class H2HService {

    private readonly repository: Repository<H2H>

    constructor() {
        this.repository = AppDataSource.getRepository(H2H)
    }

    public async loadH2HById(id: number) {
        return await this.repository.createQueryBuilder("h2h")
            .where("h2h.id = :id", { id: id })
            .getOne();
    }

    public async createH2H(h2h: H2H) {
        const h2hExist = await this.repository.createQueryBuilder("h2h")
            .where("h2h.home = :home", { home: h2h.home })
            .andWhere("h2h.year = :year", { year: h2h.year })
            .andWhere("h2h.time = :time", { time: h2h.time })
            .andWhere("h2h.away = :away", { away: h2h.away })
            .getOne();
        
        if (h2hExist) {
            throw new Error("Unable to create H2H, H2H already exist");
        }
        return await this.repository.save(h2h);
    }

}