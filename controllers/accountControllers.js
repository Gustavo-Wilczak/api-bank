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


export default {
    createAccount,
    getAllAccount,
};