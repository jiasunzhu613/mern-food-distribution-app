import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import eventRoute from "./routes/eventRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

const app = express();

// Allow express to parse JSON
app.use(express.json());

app.use(cors({
    origin: ["https://localhost:5555", "http://localhost:5173"],
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

// app.use(cors());

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

