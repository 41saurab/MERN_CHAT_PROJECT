import express from "express";
import authRouter from "../modules/auth/auth-route.js";
import chatRoute from "../modules/chat/chat-route.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/chat", chatRoute);

export default router;
