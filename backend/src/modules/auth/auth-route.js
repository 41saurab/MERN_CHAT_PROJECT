import express from "express";
import { bodyValidator } from "../../middlewares/body-validator.js";
import { userLoginDTO, userRegisterDTO } from "./auth-request.js";
import { uploadFile } from "../../middlewares/multipartParser-middleware.js";
import { authCtrl } from "./auth-controller.js";
import { checkLogin } from "../../middlewares/auth-middleware.js";

const authRouter = express.Router();

authRouter.post("/register", uploadFile("image").single("pic"), bodyValidator(userRegisterDTO), authCtrl.register);
authRouter.post("/login", bodyValidator(userLoginDTO), authCtrl.login);

authRouter.get("/me", checkLogin, authCtrl.getLoggedInUser);
authRouter.get("/user", checkLogin, authCtrl.searchUser);

export default authRouter;
