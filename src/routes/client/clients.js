import DB from "../../database/postgresSQL.js";
import { Router } from "express";
import Joi from "joi";

const client = Router()

client.get('/customers',async(req,res)=>{ 
    try{
        const table = await DB.query('SELECT * FROM customers;')
        return res.status(200).send(table.rows)
    }catch(err){return res.status(500).send(err.message)}
    
})

client.post('/customers',async(req,res)=>{
    const {name,phone,cpf,birthday} = req.body
    
})

export default client
