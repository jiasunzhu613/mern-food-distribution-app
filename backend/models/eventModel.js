import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

/*
Info that will be needed to create an event:
- Time (not sure if we should use integer or string)
- Location (string? prolly convert to coordinates)
- Items being distributed (type)
 */
const eventSchema = new Schema({
    uid: { //which user the event was created by (just put name when actually using model)
        type: String,
        required: true
    },
    date: { // range of dates more preferable?
        type: String, // TODO: need to post process
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    itemTypes:{
        type: [String],
        validate: v => Array.isArray(v) && v.length > 0
    }
},
{
    timestamps: true
});

export const Event = mongoose.model('Event', eventSchema);