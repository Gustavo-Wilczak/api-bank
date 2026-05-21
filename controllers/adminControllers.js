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

const activateUser = async (req, res, next) => {
    try {
        const updateActive = await adminServices.activateUser(req.params.id);
        res.json(updateActive)
    } catch (error) {
        next(error)
    }
};

const deactivateUser= async (req, res, next) => {
    try {
        const updateInactive = await adminServices.deactivateUser(req.params.id);
        res.json(updateInactive)
    } catch (error) {
        next(error)
    }
};

const getAccountActives = async (req,res,next)=> {
    try {
        const accountActive = await adminServices.getAccountActives()
        res.json(accountActive)
    } catch (error) {
        next(error)
    }
};
const getAccountInactives = async(req,res,next)=>{
    try {
        const accountInactive = await adminServices.getAccountInactives()
        res.json(accountInactive)
    } catch (error) {
        next(error)
    }
};



export default {
    getUserActives,
    getUserInactives,
    activateUser,
    deactivateUser,
    getAccountActives,
    getAccountInactives,
};