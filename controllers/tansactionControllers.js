import transactionService from "../services/transactionServices.js";

const getAllTransaction = async (req, res, next) => {
  try {
    const getTransaction = await transactionService.getAllTransaction();
    res.json(getTransaction);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllTransaction,
};
