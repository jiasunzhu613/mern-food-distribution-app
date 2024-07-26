import express from "express";
import {User} from "../models/userModel.js";
import fs from "fs";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { minidenticon } from 'minidenticons'

const router = express.Router();
const SATURATION = 50;
const LIGHTNESS = 50;

// Post users
router.post('/register', async (request, response) => {
    try {
        // Create object literal
        //TODO: set default values for icon and activity when inputs are not given!
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(request.body.password, salt)
        console.log(hashedPassword)
        
        const newUser = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: hashedPassword,
            icon: minidenticon(request.firstName + " " + request.lastName, SATURATION, LIGHTNESS),
            activity: 1,
            accepted: []
        };

        const userExists = await User.findOne({email: request.body.email})
        
        if(userExists) {
            response.status(400).send({message: 'User already exists'}) 
        } else {
            const user = await User.create(newUser); // Use object literal to create new user using model
            return response.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                icon: user.icon,
                accepted: []
            });
        }
    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Login user (GET)
router.post('/login', async (request, response) => {
    try {
        //Check for user email
        const login = {
            email: request.body.email,
            password: request.body.password
        }
        const user = await User.findOne({email: request.body.email})
        //Compare entered password to decrypted password
        if(user && (await bcrypt.compare(request.body.password, user.password))) {
            //Login successfull
            console.log("reached1")
            console.log(user._id)

            return response.json({
                    verdict: "success",
                    _id: user._id
                });
        }
        console.log("reached2")
        return response.json({
            verdict: "failed",
            _id: ""
        });
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

        if (request.body.password !== undefined) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(request.body.password, salt)
            console.log(hashedPassword)
        }
        //hash pw
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(request.body.password, salt)
        // console.log(hashedPassword)
        //
        // //Creating update object literal
        // const update = {
        //     firstName: request.body.firstName,
        //     lastName: request.body.lastName,
        //     email: request.body.email,
        //     password: await hashedPassword,
        //     icon: minidenticon(request.firstName + " " + request.lastName, SATURATION, LIGHTNESS),
        //     activity: request.body.activity,
        //     accepted: request.body.accepted
        // };

        // if (request.icon){
        //     update.icon = fs.readFileSync(request.body.icon, {encoding:"base64", flag:"r"});
        // }
        const result = await User.findByIdAndUpdate(id, request.body); // uses the object literal to update the values present with the id

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

router.delete('', async (request, response) => {
    try {
        const result = await User.deleteMany({});
        if (!result){
            return response.status(404).json({message: "Deletion not successful"});
        }
        return response.status(200).json({message: "Deleted " + result.deletedCount + " doocuments"});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;