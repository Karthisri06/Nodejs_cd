import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.post("/register",registerUser,);
router.post("/login", loginUser)
router.get("/profile", authenticateJWT,);

export default router;
