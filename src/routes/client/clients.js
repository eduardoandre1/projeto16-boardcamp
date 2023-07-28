import DB from "../../database/postgresSQL.js";
import { Router, json } from "express";
import Joi from "joi";

const client = Router()

client.get('/customers\:id',async(req,res)=>{ 
    
    try{
        const table = await DB.query('SELECT * FROM customers;')
        return res.status(200).send(table.rows)
    }catch(err){return res.status(500).send(err.message)}
    
})

client.post('/customers',async(req,res)=>{
    const {name,phone,cpf,birthday} = req.body
    const schema_custumer = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().min(10).max(11),
        cpf: Joi.string().min(11).max(11).required(),
        birthday: Joi.string()
    })
    const customers_create ={
        name:name,phone:phone,cpf:cpf,birthday:birthday
    }
    const input_test =schema.validate(customers_create,{ abortEarly: false })
    if(input_test.error){
        return res.status(400).send(input_test.error)
    }
    try{
        const already_have = await DB.query("SELECT * FROM $1 WHERE $3 = $2",['customers','cpf',cpf])
        if(already_have){
            return res.sendStatus(409)
        }
    }catch(err){return res.status(500).send(err.message)}

    
})

export default client
