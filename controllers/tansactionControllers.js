import transactionService from "../services/transactionServices.js";

const getAllTransaction = async (req, res, next) => {
  try {
    const getTransaction = await transactionService.getAllTransaction();
    res.json(getTransaction);
  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const transactionId = await transactionService.getTransactionById(req.params.id);
    res.json(transactionId)
  } catch (error) {
    next(error);
  }
};

const getTransactionType = async (req, res, next) => {
  try {
    const transactionType = await transactionService.getTransactionType(req.params.type);
    res.json(transactionType);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllTransaction,
  getTransactionById,
  getTransactionType
};
