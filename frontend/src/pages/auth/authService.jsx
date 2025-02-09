import HttpService from "../../services/http-service";

class AuthService extends HttpService {
    registerUser = async (data) => {
        try {
            const response = await this.postRequest("/auth/register", data, { file: true });

            return response;
        } catch (exception) {
            throw exception;
        }
    };

    loginUser = async (data) => {
        try {
            const response = await this.postRequest("/auth/login", data);

            return response;
        } catch (exception) {
            throw exception;
        }
    };

    getLoggedInUser = async () => {
        try {
            const response = await this.getRequest("/auth/me", { auth: true });

            return response;
        } catch (exception) {
            throw exception;
        }
    };

    getUserList = async ({ search = null }) => {
        try {
            let params = {};

            if (search) {
                params = {
                    ...params,
                    keyword: search,
                };
            }

            const response = await this.getRequest("/auth/user", { auth: true, params: params });

            return response;
        } catch (exception) {
            throw exception;
        }
    };
}

export const authSvc = new AuthService();
