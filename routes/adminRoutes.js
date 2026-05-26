import express from "express";
import accountControllers from "../controllers/adminControllers.js";
import adminControllers from "../controllers/adminControllers.js";
import adminMiddleware
    from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/users/active", adminControllers.getUserActives);
router.get("/users/inactive", adminControllers.getUserInactives);
router.patch("/users/:id/activate", adminControllers.activateUser);
router.patch("/users/:id/deactivate", adminControllers.deactivateUser);
router.patch("/accounts/:id/block", adminControllers.blockAccount);
router.patch("/accounts/:id/unblock", adminControllers.unblockAccount);
router.patch("/accounts/:id/close", adminControllers.closeAccount);
router.patch("/accounts/:id/open", adminControllers.openAccount);
router.post("/accounts/:id/monthly-fee", adminControllers.monthlyFeeAccount);
router.get("/accounts/negative-balance", adminControllers.getAccountsNegative);
router.get("/accounts/top-balances/:limit", adminControllers.getBiggestBalances);
router.post("/transactions/:id/refund", adminControllers.refundTransaction);
router.get("/reports/general", adminControllers.generalReport);
router.get("/reports/financial", adminControllers.financialReport);

export default router;