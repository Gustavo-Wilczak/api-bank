import express from "express";
import accountControllers from "../controllers/adminControllers.js";
import adminControllers from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/users/active" , adminControllers.getUserActives);
router.get("/users/inactive" , adminControllers.getUserInactives);
router.patch("/users/:id/activate" , adminControllers.updateUserActive);
router.patch("/users/:id/deactivate" , adminControllers.updateUserInactve);


export default router;