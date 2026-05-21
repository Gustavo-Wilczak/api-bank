import express from "express";
import accountControllers from "../controllers/adminControllers.js";
import adminControllers from "../controllers/adminControllers.js";
import adminMiddleware
 from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/users/active" , adminControllers.getUserActives);
router.get("/users/inactive" , adminControllers.getUserInactives);
router.patch("/users/:id/activate" , adminControllers.activateUser);
router.patch("/users/:id/deactivate" , adminControllers.deactivateUser);


export default router;