import express from "express";
import {User} from "../models/userModel.js";
import fs from "fs";
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"

const router = express.Router();

// Post users
router.post('', async (request, response) => {
    try {
        //TODO: Hmmm prolly only needs name tbf
        if (!request.body.name || !request.body.email || !request.body.password || !request.body.icon || !request.body.activity){
            return response.status(400).send({
                message: `Send all required fields: name, email, password, icon, activity`// function to find all types required?
            });
        }

        // Create object literal
        //TODO: set default values for icon and activity when inputs are not given!
        const newUser = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
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
router.get('', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
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
router.delete('/:id', async (request, response) => {
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

export default router;