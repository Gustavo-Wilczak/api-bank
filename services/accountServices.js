import Account from "../models/Account.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

const createAccount = async (rulesCreateCont) => {
    const { userId, type, limit } = rulesCreateCont;

    if (!userId || !type || limit === undefined) {
        const error = new Error("userId, type, and limit are required.");
        error.statusCode = 400;
        throw error;
    }

    const userExists = await User.findById(userId);

    if (!userExists) {
        const error = new Error("There is no user with that ID.");
        error.statusCode = 400;
        throw error;
    }

    if (!userExists.active) {
        const error = new Error("The user is inactive.");
        error.statusCode = 400;
        throw error;
    }

    if (!["corrente", "poupanca"].includes(type.toLowerCase())) {
        const error = new Error(
            "The account type must be 'Corrente' or 'Poupança'.",
        );
        error.statusCode = 400;
        throw error;
    }
    if (type.toLowerCase() === "poupanca" && limit > 0) {
        const error = new Error(
            "'Poupança'accounts cannot have a limit greater than 0.",
        );
        error.statusCode = 400;
        throw error;
    }

    if (type.toLowerCase() === "corrente" && userExists.age < 18) {
        const error = new Error("Minors cannot have a 'Corrente' account.");
        error.statusCode = 400;
        throw error;
    }

    return Account.create({ userId, type, limit });
};

const getAllAccount = async () => {
    return Account.find();
};

const getAccountById = async (id) => {
    const accountId = await Account.findById(id);

    if (!accountId) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }
    return accountId;
};

const getAccountByNumber = async (accountNumber) => {
    const searchNumberAccount = await Account.find({ accountNumber });

    if (!searchNumberAccount) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }
    return searchNumberAccount;
};

const checkBalance = async (id) => {
    const accountId = await Account.findById(id);

    if (!accountId) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }
    const { balance, limit } = accountId;

    const accountBalance = { balance, limit, availableBalance: balance + limit };

    return accountBalance;
};

const depositMoney = async (rulesDeposit, id) => {
    const moneyId = await Account.findById(id);

    async function createTransaction(statusReceived) {
        Transaction.create({
            accountId: moneyId._id,
            type: "deposit",
            value: value,
            previousBalance: moneyId.balance,
            valueDeposit: value,
            currentBalance: moneyId.balance + value,
            description: description,
            status: statusReceived,
        });
    }

    if (!moneyId) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }
    if (moneyId.active === false) {
        const error = new Error("The account needs to be active.");
        error.statusCode = 403;
        throw error;
    }

    if (moneyId.blocked === true) {
        const error = new Error("The account is blocked.");
        error.statusCode = 403;
        throw error;
    }

    const { value, description } = rulesDeposit;

    if (value <= 0) {
        const error = new Error("The value must be greater than zero.");
        error.statusCode = 400;
        throw error;
    }
    
    const currentBalance = moneyId.balance + value

    const accountupdate = await Account.findByIdAndUpdate(id, {
        balance: currentBalance,
    });

    const deposit = {
        message: "Deposit successfully completed",
        previousBalance: moneyId.balance,
        valueDeposit: value,
        currentBalance: currentBalance,
    };

    createTransaction("completed");

    return deposit;
};

const withdrawMoney = async (ruleWithdraw, id) => {
    const withdrawId = await Account.findById(id);

    async function createTransaction(statusReceived) {
        Transaction.create({
            accountId: withdrawId._id,
            type: "withdraw",
            value: value,
            previousBalance: withdrawId.balance,
            valueWithdraw: value,
            currentBalance: withdrawId.balance - value,
            description: description,
            status: statusReceived,
        });
    }

    if (!withdrawId) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }
    if (withdrawId.active === false) {
        const error = new Error("The account needs to be active.");
        error.statusCode = 403;
        throw error;
    }

    if (withdrawId.blocked === true) {
        const error = new Error("The account is blocked.");
        error.statusCode = 403;
        throw error;
    }

    if (withdrawId.type === "Corrente") {
        withdrawId.balance += withdrawId.limit;
    }

    const { value, description } = ruleWithdraw;

    if (value > withdrawId.balance) {
        const error = new Error("The amount is greater than the available funds.");
        error.statusCode = 400;
        throw error;
    }

    if (value <= 0) {
        const error = new Error("The value must be greater than zero.");
        error.statusCode = 400;
        throw error;
    }
    const currentBalance = withdrawId.balance - value;

    const accountupdate = await Account.findByIdAndUpdate(id, {
        balance: currentBalance,
    });

    const withdraw = {
        message: "Withdraw successfully completed",
        previousBalance: withdrawId.balance,
        valueWithdraw: value,
        currentBalance: currentBalance,
    };

    createTransaction("completed");
    return withdraw;
};

const transfeMoney = async (rulesTransfer) => {
    let originAccount = await Account.findById(rulesTransfer.fromAccountId);
    let destinationAccount = await Account.findById(rulesTransfer.toAccountId);

    const { value, description } = rulesTransfer;

    async function createTransaction(
        account,
        type,
        previousBalance,
        currentBalance,
    ) {
        Transaction.create({
            accountId: account._id,
            type: type,
            value: value,
            previousBalance: previousBalance,
            currentBalance: currentBalance,
            description: description,
            status: "completed",
        });
    }

    if (!originAccount) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }
    if (!destinationAccount) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }
    if (originAccount.active === false || destinationAccount.active === false) {
        const error = new Error("The accounts needs to be active.");
        error.statusCode = 403;
        throw error;
    }

    if (originAccount.blocked === true || destinationAccount.blocked === true) {
        const error = new Error("The accounts is blocked.");
        error.statusCode = 403;
        throw error;
    }

    if (value <= 0) {
        const error = new Error("The value must be greater than zero.");
        error.statusCode = 400;
        throw error;
    }

    if (value > originAccount.balance) {
        const error = new Error("The amount is greater than the available funds.");
        error.statusCode = 400;
        throw error;
    }

    if (originAccount._id.toString() === destinationAccount._id.toString()) {
        const error = new Error("Same account, and destination.");
        error.statusCode = 400;
        throw error;
    }

    const originPrevious = originAccount.balance;
    const destinationPrevious = destinationAccount.balance;

    originAccount.balance = originAccount.balance - value;
    destinationAccount.balance = destinationAccount.balance + value;

    const originUpdate = await Account.findByIdAndUpdate(originAccount._id, {
        balance: originAccount.balance,
    });

    const destinationUpdate = await Account.findByIdAndUpdate(
        destinationAccount._id,
        {
            balance: destinationAccount.balance,
        },
    );

    const messageTranfer = {
        message: "Transfer completed successfully",
        origin: {
            previousBalance: originPrevious,
            currentBalance: originAccount.balance,
        },
        destination: {
            previousBalance: destinationPrevious,
            currentBalance: destinationAccount.balance,
        },
        description: description,
    };

    await createTransaction(
        originAccount,
        "transfer-sent",
        originPrevious,
        originAccount.balance,
    );
    await createTransaction(
        destinationAccount,
        "transfer-received",
        destinationPrevious,
        destinationAccount.balance,
    );

    return messageTranfer;
};

const checkStatement = async (id) => {
    const accountId = await Account.findById(id);

    if (!accountId) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }

    const transactions = await Transaction.find({
        accountId: id,
    });

    const deposit = transactions.filter((t) => t.type === "deposit");
  const withdraw = transactions.filter((t) => t.type === "withdraw");
  const messageTranfer = transactions.filter(
    (t) => t.type === "transfer-sent" || t.type === "transfer-received",
  );

  const accountStatement = { deposit, withdraw, messageTranfer };

  return accountStatement;
};


const simulteWithdrawMoney = async (ruleWithdraw, id) => {
    const withdrawId = await Account.findById(id);

    async function createTransaction(statusReceived) {
        Transaction.create({
            accountId: withdrawId._id,
            type: "withdraw",
            value: value,
            previousBalance: withdrawId.balance,
            valueWithdraw: value,
            currentBalance: withdrawId.balance - value,
            status: statusReceived,
        });
    }

    if (!withdrawId) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }
    if (withdrawId.active === false) {
        const error = new Error("The account needs to be active.");
        error.statusCode = 403;
        throw error;
    }

    if (withdrawId.blocked === true) {
        const error = new Error("The account is blocked.");
        error.statusCode = 403;
        throw error;
    }

    const previousBalance = withdrawId.balance;

    let availableBalance = previousBalance;

    if (withdrawId.type === "Corrente") {
        availableBalance += withdrawId.limit;
    }

    const { value } = ruleWithdraw;

    if (value > withdrawId.balance) {
        const error = new Error("The amount is greater than the available funds.");
        error.statusCode = 400;
        throw error;
    }

    if (value <= 0) {
        const error = new Error("The value must be greater than zero.");
        error.statusCode = 400;
        throw error;
    }

    const currentBalance = previousBalance - value;

    const withdraw = {
        message: "Withdraw successfully completed",
        previousBalance: previousBalance,
        valueWithdraw: value,
        currentBalance: currentBalance,
    };

    return withdraw;
};

const simulteTransfeMoney = async (rulesTransfer) => {
    let originAccount = await Account.findById(rulesTransfer.fromAccountId);
    let destinationAccount = await Account.findById(rulesTransfer.toAccountId);

    const { value } = rulesTransfer;

    async function createTransaction(
        account,
        type,
        previousBalance,
        currentBalance,
    ) {
        Transaction.create({
            accountId: account._id,
            type: type,
            value: value,
            previousBalance: previousBalance,
            currentBalance: currentBalance,
        });
    }

    if (!originAccount) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }
    if (!destinationAccount) {
        const error = new Error("Account not found");
        error.statusCode = 404;
        throw error;
    }
    if (originAccount.active === false || destinationAccount.active === false) {
        const error = new Error("The accounts needs to be active.");
        error.statusCode = 403;
        throw error;
    }

    if (originAccount.blocked === true || destinationAccount.blocked === true) {
        const error = new Error("The accounts is blocked.");
        error.statusCode = 403;
        throw error;
    }

    if (value <= 0) {
        const error = new Error("The value must be greater than zero.");
        error.statusCode = 400;
        throw error;
    }

    if (value > originAccount.balance) {
        const error = new Error("The amount is greater than the available funds.");
        error.statusCode = 400;
        throw error;
    }

    if (originAccount._id.toString() === destinationAccount._id.toString()) {
        const error = new Error("Same account, and destination.");
        error.statusCode = 400;
        throw error;
    }

    const originPrevious = originAccount.balance;
    const destinationPrevious = destinationAccount.balance;

    const originCurrent = originPrevious - value;
    const destinationCurrent = destinationPrevious + value;

    const messageTranfer = {
        message: "Transfer completed successfully",
        origin: {
            previousBalance: originPrevious,
            currentBalance: originCurrent,
        },
        destination: {
            previousBalance: destinationPrevious,
            currentBalance: destinationCurrent,
        },
    };

    return messageTranfer;
};

export default {
    createAccount,
    getAllAccount,
    getAccountById,
    getAccountByNumber,
    checkBalance,
    depositMoney,
    withdrawMoney,
    transfeMoney,
    checkStatement,
    simulteWithdrawMoney,
    simulteTransfeMoney,
};
