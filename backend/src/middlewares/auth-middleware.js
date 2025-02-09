import { httpResponseCode, httpResponseStatus } from "../constants/http-response.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authSvc } from "../modules/auth/auth-service.js";

dotenv.config();

export const checkLogin = async (req, res, next) => {
    try {
        let token = req.headers["authorization"] || null;

        if (!token) {
            throw {
                statusCode: httpResponseCode.UNAUTHORIZED,
                message: "Login first",
                status: httpResponseStatus.UNAUTHORIZED,
                options: null,
            };
        }

        token = token.split(" ").pop();

        const data = jwt.verify(token, process.env.JWT_SECRET);

        const user = await authSvc.getUserByFilter({ _id: data.sub });

        req.loggedInUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            pic: user.pic,
        };

        next();
    } catch (exception) {
        if (exception instanceof jwt.JsonWebTokenError) {
            next({
                statusCode: httpResponseCode.UNAUTHORIZED,
                message: exception.message,
                status: httpResponseStatus.TOKEN_ERROR,
                options: null,
            });
        } else if (exception instanceof jwt.TokenExpiredError) {
            next({
                statusCode: httpResponseCode.UNAUTHORIZED,
                message: exception.message,
                status: httpResponseStatus.TOKEN_EXPIRED,
                options: null,
            });
        } else {
            next(exception);
        }
    }
};
