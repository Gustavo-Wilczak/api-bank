import express from "express";
import userControllers from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", userControllers.createUser);
router.get("/", userControllers.getAllUsers);

router.get("/:id", userControllers.getUserById);

export default router;