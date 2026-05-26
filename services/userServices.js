import Account from "../models/Account.js";
import User from "../models/User.js";


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

const updateUser = async (id, data) => {
    const { newName, newEmail, newCpf, newPhoneNumber, newAge, } = data

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

    const userUpdateId = await User.findByIdAndUpdate(id, data, {
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

    const userCpf = await User.find({ cpf })
    if (!userCpf) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }


    return userCpf;
}

const getUserByEmail = async (email) => {

    const userEmail = await User.find({ email })
    if (!userEmail) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return userEmail;
}

const updateMe = async (userId, data) => {
    delete data.role;
    delete data.active;

    if(data.email) {
        const emailExists = await User.findOne({
            email: data.email,
            _id: { $ne: userId}
        })

        if (emailExists) {
            throw new Error("A user with this email already exists.")
        }
    }

    const user = await User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true
    })

    if (!user) {
        throw new Error("User not found")
    }

    return user;
}



export default {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUsers,
    getUserByCpf,
    getUserByEmail,
    updateMe
};
