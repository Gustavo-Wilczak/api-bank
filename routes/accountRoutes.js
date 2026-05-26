import express from "express";
import accountControllers from "../controllers/accountControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, accountControllers.createAccount);
router.get("/meAccount" , authMiddleware, accountControllers.getMeAccount);
router.get("/", accountControllers.getAllAccount);
router.get("/:id", accountControllers.getAccountById);
router.get("/number/:accountNumber", accountControllers.getAccountByNumber);
router.get("/:id/balance", accountControllers.checkBalance);
router.post("/:id/deposit", accountControllers.depositMoney);
router.post("/:id/withdraw", accountControllers.withdrawMoney);
router.post("/transfer", accountControllers.transfeMoney);
router.get("/:accountId/statement", accountControllers.checkStatement);
router.post("/:id/withdraw/simulate", accountControllers.simulteWithdrawMoney);
router.post("/transfer/simulate" ,  accountControllers.simulteTransfeMoney)
export default router;
