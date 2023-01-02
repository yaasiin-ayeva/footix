import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm"
import BaseModel from "./base.entity"
import { Role } from "./role.entity"
import { Rule } from "./rule.entity"
import { RuleCollection } from "./ruleCollection.entity"

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

    @ManyToOne(() => RuleCollection)
    @JoinColumn({name:"rule_collection_id"})
    ruleCollection: RuleCollection
    
}
