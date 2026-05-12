import express from "express";
import transactionControllers from "../controllers/tansactionControllers.js";

const router = express.Router();

router.get("/" , transactionControllers.getAllTransaction);


export default router;