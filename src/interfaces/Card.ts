export interface Card {
    id: number,
    text: string,
    list: listType
}

export enum listType {ToDo, inProgress, doneCards}