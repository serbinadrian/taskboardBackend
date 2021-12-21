import {Request, Response} from "express";
import {addBoardToDataBase, removeBoardFromDataBase} from "../service/mongo";
import {Board} from "../interfaces/Board";

export const addBoard = (request: Request, response: Response) => {
    const board = request.body;

    addBoardToDataBase(board, function (newBoard?: Board) {
        if (newBoard) {
            response.send(board)
        } else {
            response.status(500);
            response.end("ERROR");
        }
    });
};

export const removeBoard = (request: Request, response: Response) => {
    const board = request.body;

    removeBoardFromDataBase(board, function (resultOfDelete: any) {
        if (resultOfDelete) {
            response.send(resultOfDelete);
        } else {
            response.status(500);
            response.end("ERROR");
        }
    })
};