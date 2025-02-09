import HttpService from "@/services/http-service";

class ChatService extends HttpService {
    sendMessage = async ({ receiver, message }) => {
        try {
            const response = await this.postRequest("/chat/create", { receiver, message }, { auth: true });


            return response.data;
        } catch (exception) {
            console.error("Error sending message:", exception); 
            throw exception;
        }
    };

    getChats = async (otherUserId) => {
        try {
            const response = await this.getRequest(`/chat/chat-with/${otherUserId}`, { auth: true });

            return response; 
        } catch (exception) {
            throw exception;
        }
    };
}

export const chatSvc = new ChatService();
