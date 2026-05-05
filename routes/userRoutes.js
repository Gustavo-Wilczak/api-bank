import express from "express";
import userControllers from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", userControllers.createUser);
router.get("/", userControllers.getAllUsers);
router.get("/:id", userControllers.getUserById);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUsers);
router.get("/cpf/:cpf", userControllers.getUserByCpf);
router.get("/email/:email", userControllers.getUserByEmail)



export default router;