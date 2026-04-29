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
        const error = new Error("Já existe um usuário com esse email");
        error.statusCode = 400;
        throw error;
    }

    const userExistsCPF = await User.findOne({ cpf });

    if (userExistsCPF) {
        const error = new Error("Já existe um usuário com esse CPF");
        error.statusCode = 400;
        throw error;
    }
    0
    return User.create({ name, email, phoneNumber, cpf, age });
}

const getAllUsers = async () => {
    return User.find();
}

const getUserById = async (id) => {
    const usersId = await User.findById(id);
    
    if (!usersId) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
      }
    
      return usersId;
};




export default {
    createUser,
    getAllUsers,
    getUserById,
};
