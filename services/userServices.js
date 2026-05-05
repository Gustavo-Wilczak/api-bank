import Account from "../models/Account.js";
import User from "../models/User.js";

const createUser = async (rulesCreateUser) => {
    const { name, email, cpf, phoneNumber, age, } = rulesCreateUser

    if (!name || !email || !cpf || !phoneNumber || !age === undefined) {
        const error = new Error("Name, email, phone number, CPF, and age are required.");
        error.statusCode = 400;
        throw error;
    }

    const userExistsEmail = await User.findOne({ email });

    if (userExistsEmail) {
        const error = new Error(" A user with this email already exists.");
        error.statusCode = 400;
        throw error;
    }

    const userExistsCPF = await User.findOne({ cpf });

    if (userExistsCPF) {
        const error = new Error("There is already a user with that CPF.");
        error.statusCode = 400;
        throw error;
    }

    return User.create({ name, email, phoneNumber, cpf, age });
}

const getAllUsers = async () => {
    return User.find();
}

const getUserById = async (id) => {
    const usersId = await User.findById(id);

    if (!usersId) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return usersId;
};

const updateUser = async (id, newRulesCreateUser) => {
    const { newName, newEmail, newCpf, newPhoneNumber, newAge, } = newRulesCreateUser

    const userExistsEmail = await User.findOne({ newEmail });

    if (userExistsEmail) {
        const error = new Error(" A user with this email already exists.");
        error.statusCode = 400;
        throw error;
    }

    const userExistsCPF = await User.findOne({ newCpf });

    if (userExistsCPF) {
        const error = new Error("There is already a user with that CPF.");
        error.statusCode = 400;
        throw error;
    }

    const userUpdateId = await User.findByIdAndUpdate(id, newRulesCreateUser, {
        new: true,
        runValidators: true,
    });

    if (!userUpdateId) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return userUpdateId;
}

const deleteUsers = async (id) => {

    const userDelete = await User.findByIdAndDelete(id)

    if (!userDelete) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return userDelete;
}

const getUserByCpf = async (cpf) => {

    const userCpf = await User.findOne({ cpf })
    if (!userCpf) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }


    return userCpf;
}

const getUserByEmail = async (email) => {

    const userEmail = await User.findOne({ email })
    if (!userEmail) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return userEmail;
}

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUsers,
    getUserByCpf,
    getUserByEmail,
};
