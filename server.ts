"use strict"
import {application} from "./src/app"

const port = process.env['PORT'] || 4001;

application.listen(port);
