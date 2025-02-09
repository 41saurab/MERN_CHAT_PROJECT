import { chatSvc } from "./chat-service.js";

class ChatController {
    listChatDetails = async (req, res, next) => {
        try {
            const loggedInUser = req.loggedInUser;
            const receiver = req.params.userId;

            const chatDetail = await chatSvc.listChatByFilter({
                $or: [
                    { sender: loggedInUser._id, receiver: receiver },
                    { receiver: loggedInUser._id, sender: receiver },
                ],
            });

            res.json({
                data: chatDetail,
                message: "Chat details",
                status: "SUCCESS",
                options: null,
            });
        } catch (exception) {
            next(exception);
        }
    };

    storeChat = async (req, res, next) => {
        try {
            const payload = req.body;
            payload["sender"] = req.loggedInUser._id;
            payload["seen"] = false;

            const chat = await chatSvc.createChat(payload);
            const allChats = await chatSvc.listChatByFilter({
                $or: [
                    { sender: req.loggedInUser._id, receiver: payload.receiver },
                    { receiver: req.loggedInUser._id, sender: payload.receiver },
                ],
            });

            res.json({
                data: allChats,
                message: "Chat stored successfully.",
                status: "SUCCESS",
                options: null,
            });
        } catch (exception) {
            next(exception);
        }
    };
}

export const chatCtrl = new ChatController();
