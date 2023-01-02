import BaseModel from "./base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { RuleCollection } from "./ruleCollection.entity";

@Entity("rule")
export class Rule extends BaseModel  {
    @Column({type: "int"})
    win: number

    @Column({type: "int"})
    draw: number

    @Column({type: "int"})
    loss: number

    @ManyToOne(() => RuleCollection, (ruleCollection) => ruleCollection.rule)
    ruleCollection: RuleCollection
}