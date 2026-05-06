import accountService from "../services/accountServices.js";

const createAccount = async (req, res, next) => {
    try {
        const account = await accountService.createAccount(req.body);
        res.status(201).json(account)
    } catch (error) {
        next(error);
    }

}

const getAllAccount = async (req, res, next) => {
    try {
        const accounts = await accountService.getAllAccount();
        res.json(accounts)
    } catch (error) {
        next(error);
    }
}

const getAccountById = async (req, res, next) => {
    try {
        const accountById = await accountService.getAccountById(req.params.id);
        res.json(accountById)
    } catch (error) {
        next(error);
    }

}

const getAccountByNumber = async (req, res, next) => {
    try {
        const searchNumberAccount = await accountService.getAccountByNumber(req.params.accountNumber);
        res.json(searchNumberAccount)
    } catch (error) {
        next(error)
    }
}

const checkBalance = async (req, res, next) => {
    try {
        const balanceById = await accountService.checkBalance(req.params.id)
        res.json(balanceById)
    } catch (error) { next(error) }
}
export default {
    createAccount,
    getAllAccount,
    getAccountById,
    getAccountByNumber,
    checkBalance,
};