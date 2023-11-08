import mongoose from "mongoose";
const { Schema } = mongoose;

/*
Info that will be needed to create an event:
- Time (not sure if we should use integer or string)
- Location (string? prolly convert to coordinates)
- Items being distributed (type)
 */
const userSchema = new Schema({
    Name: { // range of dates more preferable?
        type: [String], // need to post process
        required: true
    },
    Profile: { // Retrieved: https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
        type: Buffer, // need to post process
        contentType: String // (not sure what content type is...)
    },
    Activity:{ // a set of different activities indexed using numbers (?)
        type: Number
    }
});

export const user = mongoose.model('User', userSchema);