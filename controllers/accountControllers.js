import accountService from "../services/accountServices.js";

const createAccount = async (req, res, next) => {
  try {
    const account = await accountService.createAccount(req.body);
    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
};

const getAllAccount = async (req, res, next) => {
  try {
    const accounts = await accountService.getAllAccount();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
};

const getAccountById = async (req, res, next) => {
  try {
    const accountById = await accountService.getAccountById(req.params.id);
    res.json(accountById);
  } catch (error) {
    next(error);
  }
};

const getAccountByNumber = async (req, res, next) => {
  try {
    const searchNumberAccount = await accountService.getAccountByNumber(
      req.params.accountNumber,
    );
    res.json(searchNumberAccount);
  } catch (error) {
    next(error);
  }
};

const checkBalance = async (req, res, next) => {
  try {
    const balanceById = await accountService.checkBalance(req.params.id);
    res.json(balanceById);
  } catch (error) {
    next(error);
  }
};

const depositMoney = async (req, res, next) => {
  try {
    const deposit = await accountService.depositMoney(req.body, req.params.id);
    res.json(deposit);
  } catch (error) {
    next(error);
  }
};

const withdrawMoney = async (req, res, next) => {
  try {
    const withdraw = await accountService.withdrawMoney(
      req.body,
      req.params.id,
    );
    res.json(withdraw);
  } catch (error) {
    next(error);
  }
};

const transfeMoney = async (req, res, next) => {
  try {
    const transfer = await accountService.transfeMoney(req.body);
    res.json(transfer);
  } catch (error) {
    next(error);
  }
};

const checkStatement = async (req, res, next) => {
  try {
    const statement = await accountService.checkStatement(req.params.accountId);
    res.json(statement);
  } catch (error) {
    next(error);
  }
};

const simulteWithdrawMoney = async (req, res, next) => {
  try {
    const simulteWithdraw = await accountService.simulteWithdrawMoney(
      req.body,
      req.params.id,
    );
    res.json(simulteWithdraw);
  } catch (error) {
    next(error);
  }
};

const simulteTransfeMoney = async (req, res, next) => {
  try {
    const simulteTransfer = await accountService.simulteTransfeMoney(req.body , req.params.id);
    res.json(simulteTransfer);
  } catch (error) {
    next(error);
  }
};

export default {
  createAccount,
  getAllAccount,
  getAccountById,
  getAccountByNumber,
  checkBalance,
  depositMoney,
  withdrawMoney,
  transfeMoney,
  checkStatement,
  simulteWithdrawMoney,
  simulteTransfeMoney,
};
