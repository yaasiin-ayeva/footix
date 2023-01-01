import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { H2H } from "../entity/H2H.entity"
import * as XLSX from 'xlsx';
import * as moment from 'moment';

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

        let row: any;
        for (row of rows) {

            if (isNaN(row.year)) {
                console.log("Invalid year in row: ", row);
                continue;
            }

            let dateString: string;
            const date = await this.getDateString(row.time);
            const time = await this.getTimeString(row.time);

            if (!time || !date) {
                console.log("Invalid time in row: ", row);
                continue;
            }

            dateString = `${date}${row.year} ${time}`;

            if (!moment(dateString, "DD.MM.YYYY hh:mm").isValid()) {
                console.log("Invalid time in row: ", row);
                continue;
            }

            const h2hDate = new Date(dateString);

            const h2h = new H2H();
            h2h.time = h2hDate;
            h2h.home = row.home;
            h2h.away = row.away;
            h2h.homeScore = row.homeScore;
            h2h.awayScore = row.awayScore;

            try {
                h2hCreated.push(await this.createH2H(h2h));
            } catch (error) {
                console.log(error);
            }
        }
        return h2hCreated;
    }

    private async getTimeString(h2hTime: String): Promise<string> {
        const time = h2hTime.match(/\d{2}:\d{2}/);
        if (time) {
            return time[0];
        }
        return null;
    }

    private async getDateString(h2hTime: String): Promise<string> {
        const date = h2hTime.match(/\d{2}.\d{2}./);
        if (date) {
            return date[0];
        }
        return null;
    }
}