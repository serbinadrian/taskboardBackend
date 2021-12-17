import Express = require("express");
import compression = require("compression");
import bodyParser = require("body-parser");
import {apiRouter} from "./router";
import {NextFunction, Request, Response} from "express";

export const application = Express();

application.use(compression());
application.use(bodyParser.urlencoded({extended: false}));
application.use(bodyParser.json());

application.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:2880");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    response.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    next();
});

application.use('/', (request: Request, response: Response, next: NextFunction) => {
   console.log(request.url, " ", request.protocol);
   next();
});

application.use("/api", apiRouter);

application.use("/", (request: Request, response: Response) => {
    response.status(404);
    response.send('Not found');
});
