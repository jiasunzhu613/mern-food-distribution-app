import mongoose from "mongoose";
const { Schema } = mongoose;

/*
Info that will be needed to create an event:
- Time (not sure if we should use integer or string)
- Location (string? prolly convert to coordinates)
- Items being distributed (type)
 */
const eventSchema = new Schema({
    Date: { // range of dates more preferable?
        type: Date, // need to post process
        required: true
    },
    Location: {
        type: String, // need to post process
        required: true
    },
    ItemTypes:{
        type: [String],
        required: true
    }
});

export const event = mongoose.model('Event', eventSchema);