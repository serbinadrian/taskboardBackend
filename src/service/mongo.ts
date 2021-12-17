import mongoose = require("mongoose");
import {Card, listType} from "../interfaces/Card";

const cardSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true,
        default: ''
    },
    list: {
        type: Number,
        required: true,
        default: listType.ToDo
    }
}, {versionKey: false});
const Cards = mongoose.model("Cards", cardSchema);

mongoose.connect("mongodb://localhost:27017/cards")
    .then(() => {
        console.log('Mongo connection established');
    })
    .catch(console.error);

export const getCards = (callback: Function) => {
    return Cards.find({}, callback);
};

export const addCard = (card: Card, callback: Function) => {
    Cards.create(card)
        .then(doc => {
            callback(doc);
        })
        .catch(console.error);
};

export const removeCard = (cardId: number, callback: Function) => {
    Cards.deleteOne({id: cardId}, callback);
};

export const changeListOfCard = (card: Card, callback: Function) => {
    Cards.updateOne({id: card.id}, {list: card.list}, callback);
};