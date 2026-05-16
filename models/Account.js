import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
        default: () => Math.floor(100000 + Math.random() * 900000),
    },
    agency: {
        type: String,
        required: true,
        default: "001",
    },
    type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    limit: {
        type: Number,
        required: true,
        default: 0
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },

    blocked: {
        type: Boolean,
        required: true,
        default: false,
    }
},
    {
        collection: "account",
        timestamps: true


    });

export default mongoose.model("Account", accountSchema);

