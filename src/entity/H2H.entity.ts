import BaseModel from "./base.entity";
import { Column, Entity } from "typeorm";

@Entity("h2h")
export class H2H extends BaseModel {

    @Column({ type: "datetime" })
    time: Date

    @Column({ type: "varchar" })
    home: string

    @Column({ type: "varchar" })
    away: string

    @Column({ type: "varchar" })
    homeScore: string

    @Column({ type: "varchar" })
    awayScore: string
}