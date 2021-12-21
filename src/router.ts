import express = require('express');
import {addCardToDataBase, getCardsFromDataBase, removeCardFromDataBase, updateCardList} from "./controllers/api";
import {signInUser, signUpUser} from "./controllers/user";

export const apiRouter = express.Router();

apiRouter.route('/cards')
    .get(getCardsFromDataBase)
    .post(addCardToDataBase)
    .delete(removeCardFromDataBase);

apiRouter.route('/card/change-list')
    .post(updateCardList);

apiRouter.route('/user/signup')
    .post(signUpUser);

apiRouter.route('/user/signin')
    .post(signInUser);