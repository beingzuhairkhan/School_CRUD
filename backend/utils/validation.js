import Joi from "joi";

export const schema = Joi.object({
    name: Joi.string().min(3).required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    contact: Joi.string().pattern(/^[0-9]{10}$/).required(),
    email_id: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "in" , "edu"] } })
        .required(),
});
