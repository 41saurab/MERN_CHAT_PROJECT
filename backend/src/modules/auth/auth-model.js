import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        pic: {
            type: String,
            default: "https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?semt=ais_hybrid",
        },
    },
    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true,
    }
);

export const userModel = mongoose.model("User", userSchema);
