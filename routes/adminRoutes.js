import express from "express";
import adminControllers from "../controllers/adminControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/users/active", authMiddleware, adminMiddleware, adminControllers.getUserActives);
router.get("/users/inactive", authMiddleware, adminMiddleware, adminControllers.getUserInactives);
router.patch("/users/:id/activate", authMiddleware, adminMiddleware,adminControllers.activateUser);
router.patch("/users/:id/deactivate", authMiddleware, adminMiddleware, adminControllers.deactivateUser);
router.patch("/accounts/:id/block", authMiddleware, adminMiddleware, adminControllers.blockAccount);
router.patch("/accounts/:id/unblock", authMiddleware, adminMiddleware, adminControllers.unblockAccount);
router.patch("/accounts/:id/close", authMiddleware, adminMiddleware, adminControllers.closeAccount);
router.patch("/accounts/:id/open", authMiddleware, adminMiddleware, adminControllers.openAccount);
router.post("/accounts/:id/monthly-fee", authMiddleware, adminMiddleware, adminControllers.monthlyFeeAccount);
router.get("/accounts/negative-balance", authMiddleware, adminMiddleware, adminControllers.getAccountsNegative);
router.get("/accounts/top-balances/:limit", authMiddleware, adminMiddleware, adminControllers.getBiggestBalances);
router.post("/transactions/:id/refund", authMiddleware, adminMiddleware, adminControllers.refundTransaction);
router.get("/reports/general", authMiddleware, adminMiddleware, adminControllers.generalReport);
router.get("/reports/financial", authMiddleware, adminMiddleware, adminControllers.financialReport);

export default router;