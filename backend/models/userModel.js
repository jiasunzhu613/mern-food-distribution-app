import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: { //a sign up email
        type: String,
        required: true,
        unique: true
    },
    password: { // TODO: needs hashing
        type: String,
        required: true
    },
    icon: { // Retrieved: https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
        type: Buffer, // TODO:need to post process
        contentType: String // (not sure what content type is...)
    },
    activity:{ // a set of different activities indexed using numbers (?)
        type: Number
    }
},
{
    timestamps: true
}
);

export const User = mongoose.model('User', userSchema);