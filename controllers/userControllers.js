
import userServices from "../services/userServices.js";

const createUser = async (req, res, next) => {
    try {
        const user = await userServices.createUser(req.body);
        res.status(201).json(user)
    } catch (error) {
        next(error);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userServices.getAllUsers();
        res.json(users)
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const usersId = await userServices.getUserById(req.params.id);
        res.json(usersId)
    } catch (error) {
        next(error);

    }
}

const updateUser = async (req, res, next) => {
    try {
        const userUpdateId = await userServices.updateUser(req.params.id, req.body);
        res.json(userUpdateId)
    } catch (error) {
        next(error);

    }

}

const deleteUsers = async (req, res, next) => {
    try {
        const userDelete = await userServices.deleteUsers(req.params.id);
        res.json(userDelete)
    } catch (error) {
        next(error);
    }
}

const getUserByCpf = async (req, res, next) => {
    try {
        const userCpf = await userServices.getUserByCpf(req.params.cpf)
        res.json(userCpf)
    } catch (error) {
        next(error);
    }
}




export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUsers,
    getUserByCpf
};