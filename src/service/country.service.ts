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

    public async createCountry(country: Country) {
        const countryExist = await this.repository.createQueryBuilder("country")
            .where("country.name = :name", { name: country.name })
            .getOne();
        
        if (countryExist) {
            throw new Error("Unable to create country, country already exist");
        }
        return await this.repository.save(country);
    }
}