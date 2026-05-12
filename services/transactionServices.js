import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";
import User from "../models/User.js";

const getAllTransaction = async () => {
  return Transaction.find();
  
};

const getTransactionById = async (id) => {
  const transactionId = await Transaction.findById(id);

  if (!transactionId) {
    const error = new Error("Account not found");
    error.statusCode = 404;
    throw error;
  }
  return transactionId;
};

const getTransactionType = async (type) =>{

const transactionType = await Transaction.findOne({type: type});

if (!transactionType) {
  const error = new Error("Transaction not found");
    error.statusCode = 404;
    throw error;
  }
  return transactionType;
}

export default {
  getAllTransaction,
  getTransactionById,
  getTransactionType
};

