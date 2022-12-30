import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { H2H } from "../entity/H2H.entity"
import * as XLSX from 'xlsx';

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

    public async createH2HFromXLSX(filePath: string): Promise<H2H[]> {

        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        let h2hCreated = [];
        // let h2hExists = [];

        let row: any;
        for (row of rows) {
            const h2h = new H2H();
            h2h.year = row.year;
            h2h.time = row.time;
            h2h.home = row.home;
            h2h.away = row.away;
            h2h.homeScore = row.homeScore;
            h2h.awayScore = row.awayScore;

            try {
                h2hCreated.push(await this.createH2H(h2h));
            } catch (error) {
                console.log(error);
                // h2hExists.push(`Creation of the H2H cancelled because it's already exists in db. Details :  ${h2h.home} vs ${h2h.away} at ${h2h.time} in ${h2h.year}`);
            }
        }
        return h2hCreated;
    }
}