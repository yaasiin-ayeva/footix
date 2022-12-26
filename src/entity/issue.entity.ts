import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseModel from './base.entity';
import { Country } from "./country.entity";

@Entity()
export class Issue extends BaseModel {

    @Column()
    date: Date;

    @Column()
    homeTeam: string;

    @Column()
    awayTeam: string;

    @Column('float')
    homeTotalPoint: number;

    @Column('float')
    awayTotalPoint: number;

    @Column('float')
    homeMatchPlayed: number;

    @Column('float')
    awayMatchPlayed: number;

    @Column('float')
    homeTotalGoal: number;

    @Column('float')
    awayTotalGoal: number;

    @Column('float')
    homeTotalDefense: number;

    @Column('float')
    awayTotalDefense: number;

    @Column('float')
    homeShadowScore: number;

    @Column('float')
    awayShadowScore: number;

    @Column('float')
    homeShadowDefense: number;

    @Column('float')
    awayShadowDefense: number;

    @Column('float')
    homeDefenseMovingAverage: number;

    @Column('float')
    awayDefenseMovingAverage: number;

    @Column('float')
    homeGoalsMovingAverage: number;

    @Column('float')
    awayGoalsMovingAverage: number;

    @Column('float')
    homeStrengthDefense: number;

    @Column('float')
    awayStrengthDefense: number;

    @Column('float')
    homeStandardDeviation: number;

    @OneToOne(type => Country)
    @JoinColumn({ name: "country_id" })
    country: Country;
}