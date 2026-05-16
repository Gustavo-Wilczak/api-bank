import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";
import User from "../models/User.js";

const getUserActives = async (active) => {

    const usersActive = await User.find({ active: true })

    return usersActive
};
const getUserInactives = async (active) => {

    const usersInactive = await User.find({ active: false })

    return usersInactive
};

const updateUserActive = async (id, active) => {
    const userActive = await User.findById(id);

    if (!userActive) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    if (userActive.active === true) {
        const error = new Error("User is already active");
        error.statusCode = 400;
        throw error;
    }
    userActive.active = active;

    await userActive.save();

    return userActive;
};

const updateUserInactve = async (id, active) => {
    const userInactive = await User.findByIdAndUpdate(id);

    if (!userInactive) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    if (userInactive.active === false) {
        const error = new Error("User is already active");
        error.statusCode = 400;
        throw error;
    }

    if (userInactive.balance > 0) {
        const error = new Error("The user has a balance in their account.");
        error.statusCode = 400;
        throw error;
    }

    userInactive.active = active;

    await userInactive.save();
//ver depois
    return userInactive;
};



export default {
    getUserActives,
    getUserInactives,
    updateUserActive,
    updateUserInactve,
};