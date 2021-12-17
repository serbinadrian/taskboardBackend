import {Request, Response} from "express";
import {addCard, changeListOfCard, getCards, removeCard} from "../service/mongo";
import {Card} from "../interfaces/Card";

export const getCardsFromDataBase = (request: Request, response: Response) => {
    getCards((err: Error, cards: Array<Card>) => {
        if (err) {
            console.error(err);

            response.status(500);
            response.send(err);
            return;
        }

        response.send(cards);
    });
};

export const addCardToDataBase = (request: Request, response: Response) => {
    const card = request.body;

    addCard(card, (card: Card) => {
        response.send(card);
    });
};

export const removeCardFromDataBase = (request: Request, response: Response) => {
    const card = request.body;

    removeCard(card.id,(error: Error) => {
        if (error) {
            response.status(500);
            response.send(JSON.stringify('ERROR'));

            console.error(error);

            return;
        }

        response.send(JSON.stringify('OK'));
    });
};

export const updateCardList = (request: Request, response: Response) => {
    const card = request.body;

    changeListOfCard(card, (error: Error, result: number) =>{
        if (error) {
            response.status(500);
            response.send(JSON.stringify('ERROR'));

            console.error(error);

            return;
        }

        response.send(JSON.stringify('OK ' + result));
    });
}
