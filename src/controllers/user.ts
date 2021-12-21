import {Request, Response} from "express";
import {addUser, getUser} from "../service/mongo";
import {User} from "../interfaces/User";

export const signInUser = (request: Request, response: Response) => {
    const userCredits = request.body;

    getUser(userCredits, (error: Error, user: Array<User>) => {
        if (user.length) {
            response.send(user.pop());
        } else {
            response.status(404);
            response.end("Not found");
        }
    });
};

export const signUpUser = (request: Request, response: Response) => {
    const userCredits = request.body;

    addUser(userCredits, (user?: User) => {
        if (user) {
            response.send(user);
        } else {
            response.status(500);
            response.end('ERROR');
        }
    });
};