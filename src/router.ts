import express = require('express');
import {addCardToDataBase, getCardsFromDataBase, removeCardFromDataBase, updateCardList} from "./controllers/api";

export const apiRouter = express.Router();

apiRouter.route('/cards')
    .get(getCardsFromDataBase)
    .post(addCardToDataBase)
    .delete(removeCardFromDataBase);

apiRouter.route('/card/change-list')
    .post(updateCardList);