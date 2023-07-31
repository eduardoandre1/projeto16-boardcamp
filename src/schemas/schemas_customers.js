import Joi from "joi";

const schema_custumer = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string(),
    cpf: Joi.string().min(11).required().max(11).pattern(new RegExp('[0-9]{11,11}$')),
    birthday: Joi.string()
})

export default schema_custumer