import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default abstract class BaseModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public createdDatetime?: Date;

    @UpdateDateColumn()
    public updatedDatetime?: Date;
}
