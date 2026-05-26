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

    return {
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

    return {
        message: "User successfully deactivated"
    };
};

const getAccountActives = async () => {
    const accountActive = await Account.find({ active: true });

    return accountActive;
};

const getAccountInactives = async () => {
    const accountInactive = await Account.find({ active: false });

    return accountInactive
        ;
};

const blockAccount = async (id) => {
    let blockedAccount = await Account.findById(id);

    if (blockedAccount.blocked === true) {
        const error = new Error("Account already blocked");
        error.statusCode = 400;
        throw error;
    }

    blockedAccount = await Account.findByIdAndUpdate(
        id,
        { blocked: true }
    )

    if (!blockedAccount) {
        const error = new Error("Account not found");
        error.statusCode = 400;
        throw error;
    }

    return {
        message: "Account blocked successfully"
    };
};

const unblockAccount = async (id) => {
    let unblockedAccount = await Account.findById(id);

    if (unblockedAccount.blocked === false) {
        const error = new Error("Account already unlocked");
        error.statusCode = 400;
        throw error;
    }

    unblockedAccount = await Account.findByIdAndUpdate(
        id,
        { blocked: false }
    )

    if (!unblockedAccount) {
        const error = new Error("Account not found");
        error.statusCode = 400;
        throw error;
    }

    return {
        message: "Account successfully unlocked."
    };
};

const closeAccount = async (id) => {
    let closedAccount = await Account.findById(id);

    if (!closedAccount) {
        const error = new Error("Account not found");
        error.statusCode = 400;
        throw error;
    }

    if (closedAccount.balance !== 0) {
        const error = new Error("The account can only be closed with a zero balance.");
        error.statusCode = 400;
        throw error;
    }

    closedAccount = await Account.findByIdAndUpdate(
        id,
        { active: false }
    )

    return {
        message: "Account successfully closed."
    }
};

const openAccount = async (id) => {
    let openAccount = await Account.findByIdAndUpdate(
        id,
        { active: true }
    );

    if (!openAccount) {
        const error = new Error("Account not found");
        error.statusCode = 400;
        throw error;
    }

    return {
        message: "Account opened successfully"}
};

const monthlyFeeAccount = async (id, data) => {
    let account = await Account.findById(id);
    const { value, description } = data;

    if (!account) {
        const error = new Error("Account not found");
        error.statusCode = 400;
        throw error;
    }

    if (account.active === false) {
        const error = new Error("Inactive account");
        error.statusCode = 400;
        throw error;
    }

    if (account.blocked === true) {
        const error = new Error("Account blocked");
        error.statusCode = 400;
        throw error;
    }

    if (value <= 0) {
        const error = new Error("The value must be greater than 0.");
        error.statusCode = 400;
        throw error;
    }

    if (account.balance <= 0) {
        const error = new Error("Not enough balance");
        error.statusCode = 400;
        throw error;
    }
    account = await Account.findByIdAndUpdate(
        id,
        { balance: account.balance - value }
    )

    Transaction.create({
        accountId: account._id,
        type: "fee",
        value: value,
        previousBalace: account.balance,
        currentBalance: account.balance - value,
        description: description,
        status: "completed"
    })

    return {
        previousBalace: account.balance,
        value: value,
        currentBalance: account.balance - value
    }
};

const getAccountsNegative = async () => {
    return await Account.find({
        balance: { $lt: 0 }
    })
};

const getBiggestBalances = async (limit) => {
    return await Account.find().sort({ balance: -1 }).limit(limit);
};

const refundTransaction = async (id) => {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
        const error = new Error("Transaction not found");
        error.statusCode = 400;
        throw error;
    }

    if (transaction.status === "failed" || transaction.status === "canceled") {
        const error = new Error("Transaction not completed");
        error.statusCode = 400;
        throw error;
    }

    if (transaction.type !== "deposit" && transaction.type !== "withdraw" && transaction.type !== "fee") {
        const error = new Error("Invalid transaction type");
        error.statusCode = 400;
        throw error;
    }

    let account = await Account.findById(transaction.accountId);

    account = await Account.findByIdAndUpdate(
        account._id,
        { balance: transaction.type === "deposit" ? account.balance - transaction.value : account.balance + transaction.value }
    );

    Transaction.create({
        accountId: account._id,
        type: "reversal",
        value: transaction.value,
        previousBalace: account.balance,
        currentBalance: transaction.type === "deposit" ? account.balance - transaction.value : account.balance + transaction.value,
        description: transaction.description,
        status: "completed"
    });


    return {
        previousBalace: account.balance,
        reversal: transaction.value,
        currentBalance: transaction.type === "deposit" ? account.balance - transaction.value : account.balance + transaction.value
    }


};

const generalReport = async () => {
    const allAccounts = await Account.find()
    let totalBalance = 0;

    for (const account of allAccounts) {
        totalBalance += account.balance
    }

    return {
        totalUsers: await User.countDocuments(),
        totalActiveUsers: await User.countDocuments({ active: true }),
        totalInactiveUsers: await User.countDocuments({ active: false }),
        totalAccounts: await Account.countDocuments(),
        totalActiveAccounts: await Account.countDocuments({ active: true }),
        totalBlockedAccounts: await Account.countDocuments({ blocked: true }),
        totalTransactions: await Transaction.countDocuments(),
        totalBalance: totalBalance
    };
};

const financialReport = async () => {
    const allDeposit = await Transaction.find({
        type: "deposit",
        status: "completed"
    });
    const allWithdraw = await Transaction.find({
        type: "withdraw",
        status: "completed"
    });
    const allTransfer = await Transaction.find({
        $or: [
            { type: "transfer-sent" },
            { type: "transfer-received" }
        ],
        status: "completed"
    })
    const allFee = await Transaction.find({
        type: "fee",
        status: "completed"
    });
    const allReversal = await Transaction.find({
        type: "reversal",
        status: "completed"
    });

    let report = {
        totalDeposit: null,
        totalWithdraw: null,
        totalTransfer: null,
        totalFee: null,
        totalReversal: null
    }

    allDeposit.forEach(transaction => {
        report.totalDeposit += transaction.value
    })
    allWithdraw.forEach(transaction => {
        report.totalWithdraw += transaction.value
    })
    allTransfer.forEach(transaction => {
        report.totalTransfer += transaction.value
    })
    allFee.forEach(transaction => {
        report.totalFee += transaction.value
    })
    allReversal.forEach(transaction => {
        report.totalReversal += transaction.value
    })

    return report;
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
    financialReport,
};