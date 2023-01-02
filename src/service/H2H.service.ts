import { Repository } from "typeorm";
import * as XLSX from 'xlsx';
import { AppDataSource } from "../data-source";
import { H2H } from "../entity/h2h.entity";

export class H2HService {

    private readonly repository: Repository<H2H>

    constructor() {
        this.repository = AppDataSource.getRepository(H2H)
    }

    public async loadById(id: number) {
        return await this.repository.createQueryBuilder("h2h")
            .where("h2h.id = :id", { id: id })
            .getOne();
    }

    public async loadBySeason(season: [number, number]) {
        return await this.repository.createQueryBuilder("h2h")
            .where("h2h.time >= :start", { start: new Date(season[0], 0, 1) })
            .andWhere("h2h.time <= :end", { end: new Date(season[1], 11, 31) })
            .getMany();
    }

    public async loadByTeam(team: string) {
        return await this.repository.createQueryBuilder("h2h")
            .where("h2h.home = :team", { team: team })
            .orWhere("h2h.away = :team", { team: team })
            .getMany();
    }

    public async loadAll() {
        return await this.repository.createQueryBuilder("h2h")
            .getMany();
    }

    private async createH2H(h2h: H2H) {
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
            try {

                const yyyy: number = Number(row.year);
                const mm: number = Number(this.getMonthDateString(row.time)) - 1; // month is zero based in Date object
                const dd: number = Number(this.getDayDateString(row.time));
                const hh: number = Number(this.getHourString(row.time));
                const min: number = Number(this.getMinuteString(row.time));

                const h2hDate = new Date(yyyy, mm, dd, hh, min, 0, 0);
                const homeScore = this.getHomeScore(row.score);
                const awayScore = this.getAwayScore(row.score);

                const h2h = new H2H();

                h2h.time = h2hDate;
                h2h.home = row.home;
                h2h.away = row.away;
                h2h.homeScore = homeScore;
                h2h.awayScore = awayScore;

                const data = await this.createH2H(h2h);
                h2hCreated.push(data);
            } catch (error) {
                console.log(error);
            }
        }
        return h2hCreated;
    }

    private getHourString(arg: String): string {
        const hour = arg.match(/\d{2}:/);
        if (hour) {
            return hour[0].replace(/:/g, '');
        }
        return null;
    }

    private getMinuteString(arg: String): string {
        const minute = arg.match(/:\d{2}/);
        if (minute) {
            return minute[0].replace(/:/g, '');
        }
        return null;
    }

    private getDayDateString(arg: String): string {
        const date = arg.match(/\d{2}./);
        if (date) {
            return date[0].replace(/\./g, '');
        }
        return null;
    }

    private getMonthDateString(arg: String): string {
        const date = arg.match(/.\d{2}./);
        if (date) {
            return date[0].replace(/\./g, '');
        }
        return null;
    }

    private getHomeScore(arg: String): string {
        arg = arg.replace(/\s/g, '');
        const score = arg.match(/\d{1,2}:\d{1,2}/);
        if (score) {
            return score[0].split(":")[0];
        }
    }

    private getAwayScore(arg: String): string {
        arg = arg.replace(/\s/g, '');
        const score = arg.match(/\d{1,2}:\d{1,2}/);
        if (score) {
            return score[0].split(":")[1];
        }
        return null;
    }
}