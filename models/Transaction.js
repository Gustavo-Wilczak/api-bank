import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  
    accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  value: {
    type: Number,
    required: true,
    trim: true,
  },
  previousBalance: {
    type: Number,
    required: true,
    trim: true,
  },
  currentBalance: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
},
{
        collection: "transaction",
        timestamps: true


    });

export default mongoose.model("transacton", transactionSchema);
