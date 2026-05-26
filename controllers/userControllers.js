
import userServices from "../services/userServices.js";

const getMe = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "Logged in user found",
            data: req.user,
        })
    } catch (error) {
        next(error);
    }
};

const updateMe = async (req, res, next) => {
    try {
        const user = await userServices.updateMe(req.user._id, req.body)

        res.status(200).json({
            message: "Profile updated successfully",
            data: user,
        })
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userServices.getAllUsers();
        res.json(users)
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const usersId = await userServices.getUserById(req.params.id);
        res.json(usersId)
    } catch (error) {
        next(error);

    }
};

const updateUser = async (req, res, next) => {
    try {
        const userUpdateId = await userServices.updateUser(req.params.id, req.body);
        res.json(userUpdateId)
    } catch (error) {
        next(error);

    }

};

const deleteUsers = async (req, res, next) => {
    try {
        const userDelete = await userServices.deleteUsers(req.params.id);
        res.json(userDelete)
    } catch (error) {
        next(error);
    }
};

const getUserByCpf = async (req, res, next) => {
    try {
        const userCpf = await userServices.getUserByCpf(req.params.cpf)
        res.json(userCpf)
    } catch (error) {
        next(error);
    }
};

const getUserByEmail = async (req, res, next) => {
    try {
        const userEmail = await userServices.getUserByEmail(req.params.email)
        res.json(userEmail)
    } catch (error) {
        next(error);
    }

};



export default {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUsers,
    getUserByCpf,
    getUserByEmail,
    getMe,
    updateMe
};