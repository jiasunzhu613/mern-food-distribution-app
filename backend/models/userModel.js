import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please add a first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please add a last name"]
    },
    email: { //a sign up email
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    password: { // TODO: needs hashing
        type: String,
        required: [true, "Please create a password"]
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