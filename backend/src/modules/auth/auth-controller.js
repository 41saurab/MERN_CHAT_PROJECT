import { httpResponseCode, httpResponseStatus } from "../../constants/http-response.js";
import { authSvc } from "./auth-service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
    register = async (req, res, next) => {
        try {
            const formattedData = await authSvc.transformRegisterUser(req);
            const data = await authSvc.registerUser(formattedData);

            res.json({
                status: httpResponseStatus.OK,
                message: "User registered successfully",
                data: data,
                options: null,
            });
        } catch (exception) {
            next(exception);
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await authSvc.getUserByFilter({ email: email });

            if (bcrypt.compareSync(password, user.password)) {
                const payload = {
                    sub: user._id,
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10h" });

                res.json({
                    statusCode: httpResponseCode.SUCCESS,
                    message: "User logged in successfully",
                    data: {
                        token: token,
                        detail: {
                            _id: user._id,
                            fullName: user.fullName,
                            email: user.email,
                            pic: user.pic,
                        },
                    },
                    options: null,
                });
            } else {
                throw {
                    statusCode: httpResponseCode.UNAUTHORIZED,
                    message: "Invalid credentials",
                    status: httpResponseCode.UNAUTHORIZED,
                    options: null,
                };
            }
        } catch (exception) {
            next(exception);
        }
    };

    getLoggedInUser = async (req, res, next) => {
        try {
            res.json({
                status: httpResponseStatus.SUCCESS,
                message: "Logged in user details",
                data: req.loggedInUser,
                options: null,
            });
        } catch (exception) {
            next(exception);
        }
    };

    searchUser = async (req, res, next) => {
        try {
            let filter = {
                _id: { $ne: req.loggedInUser._id },
            };

            if (req.query.keyword) {
                filter = {
                    ...filter,
                    $or: [
                        {
                            fullName: new RegExp(req.query.keyword, "i"),
                        },
                    ],
                };
            }

            const user = await authSvc.getSearchedUser({ filter: filter });

            res.json({
                status: httpResponseStatus.SUCCESS,
                message: "Searched user",
                data: user,
                options: null,
            });
        } catch (exception) {
            next(exception);
        }
    };
}

export const authCtrl = new AuthController();
