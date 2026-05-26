import express from "express";
import transactionControllers from "../controllers/tansactionControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/me/transactions", authMiddleware, transactionControllers.getMeTransactions);
router.get("/", authMiddleware, adminMiddleware, transactionControllers.getAllTransaction);
router.get("/:id/", authMiddleware, adminMiddleware, transactionControllers.getTransactionById);
router.get("/type/:type", authMiddleware, adminMiddleware, transactionControllers.getTransactionType);
router.get("/value/:min/:max", authMiddleware, adminMiddleware, transactionControllers.transactionsByValueRange);
router.get("/year/:year", authMiddleware, adminMiddleware, transactionControllers.getTransactionByYear);


export default router;