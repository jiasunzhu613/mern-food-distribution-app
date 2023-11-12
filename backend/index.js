import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Event} from "./models/eventModel.js";
import {User} from "./models/userModel.js";


const app = express();

// Allow express to parse JSON
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send(`Welcome to CAS PROJECT`)
});

// Post events
app.post('/event', async (request, response) => {
    try {
        if (!request.body.date || !request.body.location || !request.body.itemTypes){
            return response.status(400).send({
               message: `Send all required fields: date, location, itemTypes`// function to find all types required?
            });
        }

        // Create object literal
        const newEvent = {
            date: request.body.date,
            location: request.body.location,
            itemTypes: request.body.itemTypes
        };
        const event = await Event.create(newEvent); // Use object literal to create new event using model
        return response.status(201).send(event);
    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Post users
app.post('/user', async (request, response) => {
    try {
        //TODO: Hmmm prolly only needs name tbf
        if (!request.body.name || !request.body.icon || !request.body.activity){
            return response.status(400).send({
                message: `Send all required fields: name, icon, activity`// function to find all types required?
            });
        }

        // Create object literal
        //TODO: set default values for icon and activity when inputs are not given!
        const newUser = {
            name: request.body.name,
            icon: request.body.icon,
            activity: request.body.activity
        };
        const user = await User.create(newUser); // Use object literal to create new user using model
        return response.status(201).send(user);
    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


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

