import { chatModel } from "./chat-model.js";

class ChatService {
    listChatByFilter = async (filter) => {
        try {
            const data = await chatModel.find(filter, "-password").populate("sender", ["_id", "fullName", "pic"]).populate("receiver", ["_id", "fullName", "pic"]);

            return data;
        } catch (exception) {
            throw exception;
        }
    };

    createChat = async (data) => {
        try {
            const chat = new chatModel(data);
            return await chat.save();
        } catch (exception) {
            throw exception;
        }
    };
}

export const chatSvc = new ChatService();
