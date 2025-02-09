import Joi from "joi";

const ChatCreateDTO = Joi.object({
    message: Joi.string().required(),
    receiver: Joi.string().required(),
});

export default ChatCreateDTO;
