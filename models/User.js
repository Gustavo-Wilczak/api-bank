import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    cpf: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,

    },
    active: {
        type: Boolean,
        default: true,
    },
},
    {
        collection: "users",
        timestamps: true,
    });


export default mongoose.model("User", UserSchema);