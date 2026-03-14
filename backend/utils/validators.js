import Joi from "joi";
export const registerSchema = Joi.object({
  name:     Joi.string().min(2).max(50).required(),
  email:    Joi.string().email().required(),
  phone:    Joi.string().pattern(/^[6-9]\d{9}$/).required().messages({ "string.pattern.base": "Enter valid 10-digit Indian phone number" }),
  password: Joi.string().min(6).required(),
  village:  Joi.string().allow("").optional(),
  address:  Joi.string().allow("").optional(),
  pincode:  Joi.string().allow("").optional(),
});
export const loginSchema = Joi.object({
  email:    Joi.string().email().required(),
  password: Joi.string().required(),
});
export const resetPasswordSchema = Joi.object({
  token:    Joi.string().required(),
  password: Joi.string().min(6).required(),
});
