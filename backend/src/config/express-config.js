import express from "express";
import cors from "cors";
import router from "./router-config.js";
import { httpResponseCode, httpResponseStatus } from "../constants/http-response.js";
import "./db-config.js";

import colors from "colors";

const application = express();

application.use(cors());

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

application.use("/api/v1", router);

application.use((req, res, next) => {
    next({
        statusCode: httpResponseCode.NOT_FOUND,
        message: `${req.originalUrl} url not found`,
        status: httpResponseStatus.NOT_FOUND,
    });
});

application.use((error, req, res, next) => {
    console.log(colors.bgRed("Garbage error:", error));

    let statusCode = error.statusCode || httpResponseCode.INTERNAL_SERVER_ERROR;
    let message = error.message || "Internal Server Error";
    let status = error.status || httpResponseStatus.INTERNAL_SERVER_ERROR;
    let data = error.detail || null;

    if (+error.code === 11000) {
        statusCode = 400;

        let msg = {};

        Object.keys(error.keyPattern).map((field) => {
            msg[field] = `${field} already exists`;
        });

        message = msg;
        status = httpResponseStatus.VALIDATION_FAILED;
    }

    res.status(statusCode).json({
        status: status,
        message: message,
        data: data,
        options: null,
    });
});

export default application;
