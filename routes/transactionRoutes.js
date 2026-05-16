import express from "express";
import transactionControllers from "../controllers/tansactionControllers.js";

const router = express.Router();

router.get("/" , transactionControllers.getAllTransaction);
router.get("/:id/" , transactionControllers.getTransactionById);
router.get("/type/:type" , transactionControllers.getTransactionType);
router.get("/value/:min/:max" , transactionControllers.transactionsByValueRange);
router.get("/year/:year" , transactionControllers.getTransactionByYear);


export default router;