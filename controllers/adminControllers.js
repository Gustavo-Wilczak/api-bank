import adminServices from "../services/adminServices.js";


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

const blockAccount = async (req, res, next) => {
    try {
        const blockedAccount = await adminServices.blockAccount(req.params.id);
        res.json(blockedAccount);
    } catch (error) {
        next(error);
    }
};

const unblockAccount = async (req, res, next) => {
    try {
        const unblockedAccount = await adminServices.unblockAccount(req.params.id);
        res.json(unblockedAccount);
    } catch (error) {
        next(error);
    }
};

const closeAccount = async (req, res, next) => {
    try {
        const closedAccount = await adminServices.closeAccount(req.params.id);
        res.json(closedAccount);
    } catch (error) {
        next(error);
    }
};

const openAccount = async (req, res, next) => {
    try {
        const openAccount = await adminServices.openAccount(req.params.id);
        res.json(openAccount);
    } catch (error) {
        next(error);
    }
};

const monthlyFeeAccount = async (req, res, next) => {
    try {
        const accountFee = await adminServices.monthlyFeeAccount( req.params.id, req.body );
        res.json(accountFee);
    } catch (error) {
        next(error);
    }
};

const getAccountsNegative = async (req, res, next) => {
    try {
         const negativeAccounts = await adminServices.getAccountsNegative();
         res.json(negativeAccounts);
    } catch (error) {
        next(error);
    }
};

const getBiggestBalances = async (req, res, next) => {
    try {
        const balances = await adminServices.getBiggestBalances(req.params.limit);
        res.json(balances)
    } catch (error) {
        next(error);
    }
};

const refundTransaction = async (req, res, next) => {
    try {
        const refundedTransaction = await adminServices.refundTransaction(req.params.id);
        res.json(refundedTransaction);
        } catch (error) {
        next(error);
    }
};

const generalReport = async (req, res, next) => {
    try {
        const report = await adminServices.generalReport();
        res.json(report);
    } catch (error) {
        next(error);
    }
};

const financialReport = async (req, res, next) => {
    try {
        const report = await adminServices.financialReport();
        res.json(report);
    } catch (error) {
        next(error);
    }
};


export default {
    getUserActives,
    getUserInactives,
    activateUser,
    deactivateUser,
    getAccountActives,
    getAccountInactives,
    blockAccount,
    unblockAccount,
    closeAccount,
    openAccount,
    monthlyFeeAccount,
    getAccountsNegative,
    getBiggestBalances,
    refundTransaction,
    generalReport,
    financialReport
};