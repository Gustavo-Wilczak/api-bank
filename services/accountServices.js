import Account from "../models/Account.js";
import User from "../models/User.js";


const createAccount = async (rulesCreateCont) => {
    const { userId, type, limit } = rulesCreateCont;

    if (!userId || !type || !limit) {

        const error = new Error("userId, type, and limit are required.");
        error.statusCode = 400;
        throw error;
    }

    const userExists = await User.findById(userId);

    if (!userExists) {
        const error = new Error("There is no user with that ID.");
        error.statusCode = 400;
        throw error;
    }

    if (!userExists.active) {
        const error = new Error("The user is inactive.")
        error.statusCode = 400;
        throw error;
    }

    if (type === "Poupança" && limit > 0) {
        const error = new Error("Savings accounts cannot have a limit greater than 0.")
        error.statusCode = 400;
        throw error;
    }

    if (type === "Corrente" && userExists.age < 18) {
        const error = new Error("Minors cannot have a checking account.")
        error.statusCode = 400;
        throw error;
    }

    return Account.create({ userId, type, limit });
}

const getAllAccount = async () => {
    return Account.find();

}

const getAccountById = async (id) => {
    const accountId = await Account.findById(id);

    if (!accountId) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }
}


export default {
    createAccount,
    getAllAccount,
};