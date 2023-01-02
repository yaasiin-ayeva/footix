import BaseModel from "./base.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { Rule } from "./rule.entity";

@Entity("rulecollection")
export class RuleCollection extends BaseModel {

    @Column({ type: "varchar" })
    name: string

    @OneToMany(() => Rule, (rule) => rule.ruleCollection)
    rule: Rule[]

    @OneToOne(() => User, (user) => user.ruleCollection)
    user: User

}