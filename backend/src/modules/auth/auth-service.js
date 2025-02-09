import { httpResponseCode } from "../../constants/http-response.js";
import FileUploadService from "../../services/cloudinary-service.js";
import { userModel } from "./auth-model.js";
import bcrypt from "bcryptjs";
class AuthService {
    transformRegisterUser = async (req) => {
        try {
            const data = req.body;
            const file = req.file;

            const uploadFile = file ? await FileUploadService.uploadFile(file.path, "/users") : null;

            const formattedData = {
                fullName: data.fullName,
                email: data.email,
                password: bcrypt.hashSync(data.password, 10),
                pic: uploadFile || "https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?semt=ais_hybrid",
            };

            return formattedData;
        } catch (exception) {
            throw exception;
        }
    };

    registerUser = async (data) => {
        try {
            const userObj = new userModel(data);

            return await userObj.save();
        } catch (exception) {
            throw exception;
        }
    };

    getUserByFilter = async (filter) => {
        try {
            const user = await userModel.findOne(filter);

            if (!user) {
                throw {
                    status: httpResponseCode.NOT_FOUND,
                    message: "User not found",
                    options: null,
                };
            }

            return user;
        } catch (exception) {
            throw exception;
        }
    };

    getSearchedUser = async ({ filter = {} }) => {
        try {
            const userData = await userModel.find(filter, "-password").sort({ fullName: "asc" });

            return userData;
        } catch (exception) {
            throw exception;
        }
    };
}

export const authSvc = new AuthService();
