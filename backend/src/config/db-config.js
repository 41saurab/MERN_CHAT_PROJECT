import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_NAME,
            autoCreate: true,
            autoIndex: true,
        });

        console.log("Connected to MongoDB");
    } catch (exception) {
        console.log("Error connecting to MongoDB", exception.message);
        process.exit(1);
    }
};

dbConnection();
