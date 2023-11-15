import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Event} from "./models/eventModel.js";
import {User} from "./models/userModel.js";
import * as fs from "fs";

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

// Get all events
app.get('/event', async (request, response) => {
    try{
        const events = await Event.find({});
        return response.status(200).json({
            count : events.length,
            data : events
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Get event by id
app.get('/event/:id', async (request, response) => {
    try{
        const id = request.params.id; // Gets id field from "/event/:id"
        const event = await Event.findById(id); // Finding event using id
        return response.status(200).json(event);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Update event
app.put('/event/:id', async (request, response) => {
    try{
        if (!request.body.date || !request.body.location || !request.body.itemTypes){
            return response.status(400).send({
                message: `Send all required fields: date, location, itemTypes`// function to find all types required?
            });
        }
        const id = request.params.id;
        const result = await Event.findByIdAndUpdate(id, request.body);

        if (!result){
            return response.status(404).json({message : 'EEvent not found'});
        }
        return response.status(200).json({message : 'Event updated successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Delete event
app.delete('/event/:id', async (request, response) => {
    try{
        const id = request.params.id;
        const result = await Event.findOneAndDelete(id);

        if (!result){
            return response.status(404).json({message : 'Event not found'});
        }
        return response.status(200).json({message : 'Event deleted successfully'});
    }catch(error){
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
            icon: fs.readFileSync(request.body.icon, {encoding:"base64", flag:"r"}),
            activity: request.body.activity
        };
        const user = await User.create(newUser); // Use object literal to create new user using model
        return response.status(201).send(user);
    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Get all users
app.get('/user', async (request, response) => {
    try{
        const users = await User.find({});
        return response.status(200).json({
            count : users.length,
            data : users
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Get user by id
app.get('/user/:id', async (request, response) => {
    try{
        const id = request.params.id;
        const user = await User.findById(id);
        return response.status(200).json(user);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Update user
app.put('/user/:id', async (request, response) => {
    try{
        if (!request.body.name || !request.body.icon){
            return response.status(400).send({
                message: `Send all required fields: name, icon`// function to find all types required?
            });
        }
        const id = request.params.id; // getting id from the parameters
        //Creating update object literal
        const update = {
            name: request.body.name,
            icon: fs.readFileSync(request.body.icon, {encoding:"base64", flag:"r"}),
            activity: request.body.activity
        };
        const result = await User.findByIdAndUpdate(id, update); // uses the object literal to update the values present with the id

        if (!result){
            return response.status(404).json({message : 'User not found'});
        }
        return response.status(200).json({message : 'User updated successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Delete user
app.delete('/user/:id', async (request, response) => {
    try{
        const id = request.params.id;
        const result = await User.findOneAndDelete(id);

        if (!result){
            return response.status(404).json({message : 'User not found'});
        }
        return response.status(200).json({message : 'User deleted successfully'});
    }catch(error){
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

