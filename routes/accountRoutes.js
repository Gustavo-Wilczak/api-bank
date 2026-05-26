import express from "express";
import accountControllers from "../controllers/accountControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, accountControllers.createAccount);
router.get("/meAccount" , authMiddleware, accountControllers.getMeAccount);
router.get("/", authMiddleware, adminMiddleware, accountControllers.getAllAccount);
router.get("/:id", authMiddleware, adminMiddleware, accountControllers.getAccountById);
router.get("/number/:accountNumber", authMiddleware, adminMiddleware, accountControllers.getAccountByNumber);
router.get("/:id/balance", authMiddleware, accountControllers.checkBalance);
router.post("/:id/deposit", authMiddleware, accountControllers.depositMoney);
router.post("/:id/withdraw", authMiddleware, accountControllers.withdrawMoney);
router.post("/transfer",  authMiddleware, accountControllers.transfeMoney);
router.get("/:accountId/statement", authMiddleware, accountControllers.checkStatement);
router.post("/:id/withdraw/simulate", authMiddleware, accountControllers.simulteWithdrawMoney);
router.post("/transfer/simulate", authMiddleware,authMiddleware, accountControllers.simulteTransfeMoney)
export default router;
