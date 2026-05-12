import express from "express";
import accountControllers from "../controllers/accountControllers.js";

const router = express.Router();

router.post("/", accountControllers.createAccount);
router.get("/", accountControllers.getAllAccount);
router.get("/:id", accountControllers.getAccountById);
router.get("/number/:accountNumber", accountControllers.getAccountByNumber);
router.get("/:id/balance", accountControllers.checkBalance);
router.post("/:id/deposit", accountControllers.depositMoney);
router.post("/:id/withdraw", accountControllers.withdrawMoney);
router.post("/transfer", accountControllers.transfeMoney);
router.get("/:id/statement", accountControllers.checkStatement);
router.post("/:id/withdraw/simulate", accountControllers.simulteWithdrawMoney);
router.post("/transfer/simulate" ,  accountControllers.simulteTransfeMoney)
export default router;
