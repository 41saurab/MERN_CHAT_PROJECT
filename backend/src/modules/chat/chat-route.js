import express from "express";
import { checkLogin } from "../../middlewares/auth-middleware.js";
import { bodyValidator } from "../../middlewares/body-validator.js";
import ChatCreateDTO from "./chat-request.js";
import { chatCtrl } from "./chat-controller.js";

const chatRoute = express.Router();

chatRoute.post("/create", checkLogin, bodyValidator(ChatCreateDTO), chatCtrl.storeChat);
chatRoute.get("/chat-with/:userId", checkLogin, chatCtrl.listChatDetails);

export default chatRoute;
