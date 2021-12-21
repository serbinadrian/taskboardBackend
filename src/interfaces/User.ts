import {Board} from "./Board";

export interface User {
    id: number,
    login: number,
    password:string,
    email?: string,
    boards?: Array<Board>
}