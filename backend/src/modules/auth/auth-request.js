import Joi from "joi";

export const userRegisterDTO = Joi.object({
    fullName: Joi.string()
        .regex(/^([A-Za-z]+(?:\s[A-Za-z]+){1,2})$/)
        .required()
        .messages({
            "string.empty": "Full name is required.",
            "string.pattern.base": "Full name must contain at least a first name and last name, and can optionally include a middle name. Only letters are allowed.",
        }),
    email: Joi.string().email().required().messages({
        "string.email": "A valid email address is required (e.g., example@domain.com).",
        "string.empty": "Email is required.",
    }),
    password: Joi.string()
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&+-^])(?=.*[\d])[A-Za-z\d!@#$%&+-^]{8,25}$/)
        .required()
        .messages({
            "string.empty": "Password is required.",
            "string.pattern.base":
                "Password must be 8-25 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., !@#$%&+-^).",
        }),
    confirmPassword: Joi.string().equal(Joi.ref("password")).required().messages({
        "any.only": "Passwords do not match.",
        "string.empty": "Confirm password is required.",
    }),
});

export const userLoginDTO = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
