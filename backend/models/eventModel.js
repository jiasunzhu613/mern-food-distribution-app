import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

/*
Info that will be needed to create an event:
- Time (not sure if we should use integer or string)
- Location (string? prolly convert to coordinates)
- Items being distributed (type)
 */
const eventSchema = new Schema({
    user: { //which user the event was created by
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: { // range of dates more preferable?
        type: Date, // TODO: need to post process
        required: true
    },
    location: {
        type: String, // TODO: need to post process
        required: true
    },
    itemTypes:{
        type: [String],
        required: true
    }
},
{
    timestamps: true
});

export const Event = mongoose.model('Event', eventSchema);