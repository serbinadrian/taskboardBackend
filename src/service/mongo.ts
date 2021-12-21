import mongoose = require("mongoose");
import {Card, listType} from "../interfaces/Card";
import {User} from "../interfaces/User";
import {Board} from "../interfaces/Board";

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
        required: false
    }
}, {versionKey: false});
const Users = mongoose.model("Users", userSchema);

mongoose.connect("mongodb://localhost:27017/cards")
    .then(() => {
        console.log('Mongo connection established');
    })
    .catch(console.error);

export const getCards = (idOfBoard: number, owner: string, callback: Function) => {
    Users.findOne({login: owner}, function (error: Error, foundUser: User) {
        if (error){
            console.error(error);
            callback(false);
            return;
        }

        if (foundUser.boards) {
            foundUser.boards.forEach(foundBoard => {
                if (foundBoard.id === idOfBoard) {
                    if (!foundBoard.cards) {
                        foundBoard.cards = [];
                    }

                    callback(foundBoard.cards);
                }
            });
        }
    });
};

export const addCard = (card: Card, board: Board, callback: Function) => {
    Users.findOne({login: board.owner}, function (error: Error, foundUser: User) {
        if (error){
            console.error(error);
            callback(false);
            return;
        }

        card.list = listType.ToDo;

        if (foundUser.boards) {
            foundUser.boards.forEach(foundBoard => {
                if (foundBoard.id === board.id) {
                    if (!foundBoard.cards) {
                        foundBoard.cards = [];
                    } else {
                        card.id = foundBoard.cards.length;
                    }

                    foundBoard.cards.push(card);
                }
            });
        }

        Users.updateOne({login: board.owner}, {boards: foundUser.boards}, callback);
    });
};

export const removeCard = (cardId: number, board: Board, callback: Function) => {
    Users.findOne({login: board.owner}, function (error: Error, foundUser: User) {
        if (error){
            console.error(error);
            callback(false);
            return;
        }

        if (foundUser.boards) {
            foundUser.boards.forEach(foundBoard => {
                if (foundBoard.id === board.id) {
                    if (foundBoard.cards) {
                        foundBoard.cards = foundBoard.cards.filter(foundCard => {
                            return foundCard.id !== cardId;
                        });
                    }
                }
            });
        }

        Users.updateOne({login: board.owner}, {boards: foundUser.boards}, callback);
    });
};

export const changeListOfCard = (card: Card, board:Board, callback: Function) => {
    Users.findOne({login: board.owner}, function (error: Error, foundUser: User) {
        if (error){
            console.error(error);
            callback(false);
            return;
        }

        if (foundUser.boards) {
            foundUser.boards.forEach(foundBoard => {
                if (foundBoard.id === board.id) {
                    if (foundBoard.cards) {
                        foundBoard.cards.forEach(foundCard => {
                           if (foundCard.id === card.id){
                               foundCard.list = card.list;
                           }
                        });
                    }
                }
            });
        }

        Users.updateOne({login: board.owner}, {boards: foundUser.boards}, callback);
    });
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

export const addBoardToDataBase = (board: Board, callback: Function) => {
    Users.findOne({login: board.owner}, function (error: Error, foundUser: User) {
        if (error) {
            console.log(error);
            callback(false);
            return;
        }

        if (!foundUser.boards) {
            foundUser.boards = new Array<Board>();
        } else {
            board.id = foundUser.boards.length;
        }

        foundUser.boards.push(board);

        Users.updateOne({login: foundUser.login}, {boards: foundUser.boards}, function (error: Error, updatedUser: User) {
            if (error) {
                console.error(error);
            }

            callback(updatedUser);
        });
    });
};

export const removeBoardFromDataBase = (board: Board, callback: Function) => {
    Users.findOne({login: board.owner}, function (error: Error, foundUser: User) {
        if (error) {
            console.log(error);
            callback(false);
            return;
        }

        if (foundUser.boards) {
            foundUser.boards = foundUser.boards.filter(foundBoard => {
                return foundBoard.id !== board.id;
            });

            Users.updateOne({login: foundUser.login}, {boards: foundUser.boards}, function (error: Error, updatedUser: User) {
                if (error) {
                    console.error(error);
                    callback(false);
                    return;
                }

                callback(updatedUser);
            });
        }
    });
}