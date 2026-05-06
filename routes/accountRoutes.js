import express from "express";
import accountControllers from "../controllers/accountControllers.js";

const router = express.Router();

router.post("/", accountControllers.createAccount);
router.get("/", accountControllers.getAllAccount);
router.get("/:id", accountControllers.getAccountById);
router.get("/number/:accountNumber", accountControllers.getAccountByNumber);
router.get("/:id/balance", accountControllers.checkBalance);







export default router;

