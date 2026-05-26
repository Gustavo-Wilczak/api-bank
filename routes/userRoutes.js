import express from "express";
import userControllers from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";



const router = express.Router();

router.get("/me", authMiddleware, userControllers.getMe);
router.put("/me", authMiddleware, userControllers.updateMe);
router.get("/", authMiddleware, adminMiddleware, userControllers.getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, userControllers.getUserById);
router.put("/:id", authMiddleware, adminMiddleware, userControllers.updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, userControllers.deleteUsers);
router.get("/cpf/:cpf", authMiddleware, adminMiddleware, userControllers.getUserByCpf);
router.get("/email/:email", authMiddleware, adminMiddleware, userControllers.getUserByEmail)



export default router;