import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { // range of dates more preferable?
        type: [String], // format: [first, last]  TODO: need to post process
        required: true
    },
    icon: { // Retrieved: https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
        type: Buffer, // TODO:need to post process
        contentType: String // (not sure what content type is...)
    },
    activity:{ // a set of different activities indexed using numbers (?)
        type: Number
    }
});

export const User = mongoose.model('User', userSchema);