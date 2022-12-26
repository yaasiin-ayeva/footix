import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm"
import BaseModel from "./base.entity"
import { Role } from "./role.entity"

@Entity("users")
@Unique(['username'])
export class User extends BaseModel {

    @Column({type: "varchar"})
    username: string

    @Column({type : "varchar"})
    password: string

    @Column({type: "varchar"})
    firstname: string

    @Column({type: "varchar"})
    lastname: string

    @Column({type: "varchar", nullable: true})
    picture: string

    @ManyToOne(() => Role)
    @JoinColumn({name:"role_id"})
    role: Role
    
}
