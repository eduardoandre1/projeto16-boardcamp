import Joi from "joi"
const schema_game = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().min(1),
    pricePerDay:Joi.number().min(1)
})
export default schema_game