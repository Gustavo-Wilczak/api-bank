import adminServices from "../services/adminServices.js";
import transactionService from "../services/adminServices.js";

const getUserActives = async (req, res, next) => {
    try {
        const userActive = await adminServices.getUserActives()
        res.json(userActive)
    } catch (error) {
        next(error)
    }
};
const getUserInactives = async (req, res, next) => {
    try {
        const userInactive = await adminServices.getUserInactives()
        res.json(userInactive)
    } catch (error) {
        next(error)
    }
};

const updateUserActive = async (req, res, next) => {
    try {
        const updateActive = await adminServices.updateUserActive(req.params.id);
        res.json(updateActive)
    } catch (error) {
        next(error)
    }
};

const updateUserInactve = async (req, res, next) => {
    try {
        const updateInactive = await adminServices.updateUserInactve(req.params.id);
        res.json(updateInactive)
    } catch (error) {
        next(error)
    }
};


export default {
    getUserActives,
    getUserInactives,
    updateUserActive,
    updateUserInactve,
};