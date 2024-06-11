import express from "express"
import {Event} from "../models/eventModel.js";
import {User} from "../models/userModel.js";

const router = express.Router();

// Post events
router.post('', async (request, response) => {
    try {
        const event = await Event.create(request.body); // request.body contains json data
        return response.status(201).send(event._id);
    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Get all events
router.get('', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
    try{
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
router.delete('/:id', async (request, response) => {
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

router.delete('', async (request, response) => {
    try {
        const result = await Event.deleteMany({});
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