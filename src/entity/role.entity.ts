import BaseModel from "./base.entity";
import {Column , Entity, OneToMany} from "typeorm";
import { User } from "./user.entity";

@Entity("role")
export class Role extends BaseModel  {
    
    @Column({type: "varchar"})
    name: string

    @OneToMany(() => User, (user) => user.role)
    user: User[]
}