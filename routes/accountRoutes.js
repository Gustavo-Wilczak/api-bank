import express from "express";
import accountControllers from "../controllers/accountControllers.js";

const router = express.Router();

router.post("/", accountControllers.createAccount);
router.get("/", accountControllers.getAllAccount);
export default router;