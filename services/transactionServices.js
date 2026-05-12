import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";
import User from "../models/User.js";

const getAllTransaction = async () => {
  return Transaction.find();
  //dar uma olhhada nisso aqui
};

export default {
  getAllTransaction,
};
