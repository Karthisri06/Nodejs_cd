import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateJWT, (req, res) => {
    // The user info is available from the middleware (req.user)
    return res.status(200).json({
        message: "Profile fetched successfully",
        user: req.user
    });
});

export default router;
