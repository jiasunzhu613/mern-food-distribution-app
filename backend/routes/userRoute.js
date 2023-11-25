import express from "express";
import {User} from "../models/userModel.js";
import fs from "fs";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { minidenticon } from 'minidenticons'

const router = express.Router();
const SATURATION = 50;
const LIGHTNESS = 50;

// Post users
// TODO: look into using identicons for when user does not enter an initial profile image
// https://github.com/laurentpayot/minidenticons
router.post('', async (request, response) => {
    try {
        // Create object literal
        //TODO: set default values for icon and activity when inputs are not given!
        const newUser = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,
            icon: minidenticon(request.firstName + " " + request.lastName, SATURATION, LIGHTNESS),
            activity: 1
        };
        const user = await User.create(newUser); // Use object literal to create new user using model
        return response.status(201).json(user._id);
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
//TODO: need to revisit this function
router.put('/:id', async (request, response) => {
    try{
        const id = request.params.id; // getting id from the parameters
        //Creating update object literal
        const update = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,
            icon: minidenticon(request.firstName + " " + request.lastName, SATURATION, LIGHTNESS),
            activity: request.body.activity
        };

        if (request.icon){
            update.icon = fs.readFileSync(request.body.icon, {encoding:"base64", flag:"r"});
        }

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