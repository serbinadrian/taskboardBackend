import {Card} from "./Card";

export interface Board {
    id: number,
    name: string,
    owner: string,
    cards?: Array<Card>
}