import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Country } from "../entity/country.entity";

export class CountryService {

    private readonly repository: Repository<Country>

    constructor() {
        this.repository = AppDataSource.getRepository(Country)
    }

    public async loadCountryById(id: number) {
        return await this.repository.createQueryBuilder("country")
            .where("country.id = :id", { id: id })
            .getOne()
    }
}