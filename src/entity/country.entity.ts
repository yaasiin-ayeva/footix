import { Column, Entity } from 'typeorm';
import BaseModel from './base.entity';

@Entity("country")
export class Country extends BaseModel {
    @Column({ type: "varchar" })
    country: string;
}
