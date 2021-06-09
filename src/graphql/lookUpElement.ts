import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({description: ""})
export class LookUpElement {
    @Field(type => String)
    key: string;

    @Field(type => [Number])
    value: number[];

    constructor(key: string, value: number[]) {
        this.key = key;
        this.value = value;
    }
}