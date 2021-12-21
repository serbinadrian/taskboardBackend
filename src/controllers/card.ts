import {Request, Response} from "express";
import {addCard, changeListOfCard, getCards, removeCard} from "../service/mongo";
import {User} from "../interfaces/User";
import {Card} from "../interfaces/Card";

export const getCardsFromDataBase = (request: Request, response: Response) => {
    let id = 0;
    let owner = '';

    if (request.query.id) {
        id = +request.query.id;
    }

    if (request.query.owner) {
        owner = request.query.owner.toString()
    }

    getCards(id, owner, (cards: Array<Card>) => {
        if (!cards) {
            console.error(cards);

            response.status(500);
            response.send(cards);
            return;
        }

        response.send(cards);
    });
};

export const addCardToDataBase = (request: Request, response: Response) => {
    const card = request.body.card;
    const board = request.body.board;

    addCard(card, board,(error: Error, user: User) => {
        if (error) {
            response.status(500);
            response.end('ERROR');
            return;
        }

        response.send(user);
    });
};

export const removeCardFromDataBase = (request: Request, response: Response) => {
    const cardId = request.body.cardId;
    const board = request.body.board;

    removeCard(cardId, board, (error: Error) => {
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
    const card = request.body.card;
    const board = request.body.board;

    changeListOfCard(card, board, (error: Error) =>{
        if (error) {
            response.status(500);
            response.send(JSON.stringify('ERROR'));

            console.error(error);

            return;
        }

        response.send(JSON.stringify('OK'));
    });
}
