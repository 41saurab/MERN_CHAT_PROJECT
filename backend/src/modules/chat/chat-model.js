import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        seen: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        autoCreate: true,
        autoIndex: true,
    }
);

export const chatModel = mongoose.model("Chat", chatSchema);
