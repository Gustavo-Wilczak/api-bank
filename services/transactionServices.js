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

const getTransactionType = async (type) => {

  const transactionType = await Transaction.findOne({ type: type });

  if (!transactionType) {
    const error = new Error("Transaction not found");
    error.statusCode = 404;
    throw error;
  }
  return transactionType;
};

const transactionsByValueRange = async (min, max) => {

  min: Number(min);
  max: Number(max);

  if (min === isNaN || max === isNaN) {
    const error = new Error("The values must be numbers.");
    error.statusCode = 400;
    throw error;
  }

  const transaction = await Transaction.find({
    value: {
      $gte: min,
      $lte: max
    }
  })

  if (!transaction) {
    const error = new Error("Account not found");
    error.statusCode = 404;
    throw error;
  };

  return transaction;
}

const getTransactionByYear = async (year) => {

  const start = new Date(`${year}-01-01`);
  const end = new Date(`${Number(year) + 1}-01-01`);

  const transactions = await Transaction.find({
    createdAt: {
      $gte: start,
      $lt: end
    }
  });

  return transactions;
};


export default {
  getAllTransaction,
  getTransactionById,
  getTransactionType,
  transactionsByValueRange,
  getTransactionByYear,
};

