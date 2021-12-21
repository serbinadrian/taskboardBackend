import mongoose = require("mongoose");
import {Card, listType} from "../interfaces/Card";
import {User} from "../interfaces/User";
import exp = require("constants");

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

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    login: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        default: "test@test.ru"
    },
    password: {
        type: String,
        required: true
    },
    boards: {
        type: Array,
        required:false
    }
}, {versionKey: false});
const Users = mongoose.model("Users", userSchema);

mongoose.connect("mongodb://localhost:27017/cards")
    .then(() => {
        console.log('Mongo connection established');
    })
    .catch(console.error);

export const getCards = (callback: Function) => {
    Cards.find({}, callback);
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

export const getUser = (userCredits: User, callback: Function) => {
    Users.find({login: userCredits.login, password: userCredits.password}, callback);
};

export const addUser = (user: User, callback: Function) => {
    Users.find({login: user.login}, function (error: Error, foundUser: Array<User>) {
        if (error) {
            console.error(error);

            callback(false);
            return;
        }

        Users.count({}, (error, numberOfUsers: number) => {
            if (error) {
                console.error(error);
                callback(false);
                return;
            }

            user.id = numberOfUsers;

            if (!foundUser.length) {
                Users.create(user)
                    .then(doc => {
                        callback(doc);
                    })
                    .catch(console.error)
            } else {
                callback(false);
                return;
            }
        });
    });
};