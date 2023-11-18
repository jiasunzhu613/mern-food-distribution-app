import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Event} from "./models/eventModel.js";
import eventRoute from "./routes/eventRoute.js";
import {User} from "./models/userModel.js";
import userRoute from "./routes/eventRoute.js";
import * as fs from "fs";

const app = express();

// Allow express to parse JSON
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send(`Welcome to CAS PROJECT`)
});

app.use("/event", eventRoute);

app.use("/user", userRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log(`App connected to database`);
        app.listen(PORT, () => {
            console.log(`App is listening to PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

