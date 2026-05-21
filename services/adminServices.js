import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";
import User from "../models/User.js";

const getUserActives = async () => {

    const usersActive = await User.find({ active: true })

    return usersActive
};
const getUserInactives = async () => {

    const usersInactive = await User.find({ active: false })

    return usersInactive
};

const activateUser = async (id) => {
    let userActive = await User.findById(id);

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
  
     userActive = await User.findByIdAndUpdate(
        id,
        { active: true }
    )

    return{
        message: "User successfully activated "
    };
};

const deactivateUser = async (id) => {
    const userInactive = await User.findById(id);

    if (!userInactive) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    if (userInactive.active === false) {
        const error = new Error("User is already inactive");
        error.statusCode = 400;
        throw error;
    }

    if (userInactive.balance > 0) {
        const error = new Error("The user has a balance in their account.");
        error.statusCode = 400;
        throw error;
    }

    userInactive = await User.findByIdAndUpdate(
        id,
        { active: false }
    )

    return{
        message: "User successfully deactivated"
    };
};

const getAccountActives = async ()=>{
    const accountActive = await Account.find({ active: true });

    return accountActive;
};
const getAccountInactives = async ()=>{
    const accountInactive = await Account.find({ active: false });

    return  accountInactive
    ;
};


export default {
    getUserActives,
    getUserInactives,
    activateUser,
    deactivateUser,
    getAccountActives,
    getAccountInactives,
};