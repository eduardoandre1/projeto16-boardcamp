import DB from "../../database/postgresSQL.js";
import { Router, json } from "express";
import Joi from "joi";

const client = Router()

client.get('/customers',async(req,res)=>{ 
    
    try{
        const table = await DB.query('SELECT * FROM customers;')
        return res.status(200).send(table.rows)
    }catch(err){return res.status(500).send(err.message)}
    
})
client.get(client.get('/customers/:id',async(req,res)=>{ 
    const id = req.params.id
    //schema
    const schema_id = Joi.object({id :Joi.number().integer().required()})
    // end schema
    //middleware
    const input_test =schema_id.validate({id},{ abortEarly: false })
    if(input_test.error){
        return res.sendStatus(400)
    }
    //end middleware
    //controler 
    try{
        const table = await DB.query('SELECT * FROM customers WHERE id = $1;',[id])
        if(table.rowCount === 0){
            return res.sendStatus(404)
        }
        return res.status(200).send(table.rows)
    }catch(err){return res.status(500).send(err.message)}
    
}))

client.post('/customers',async(req,res)=>{
    const {name,phone,cpf,birthday} = req.body
    // schema
    const schema_custumer = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().min(10).max(11),
        cpf: Joi.string().min(11).required(),
        birthday: Joi.string()
    })
    //schema end
    //middlleware
    const customers_create ={
        name:name,phone:phone,cpf:cpf,birthday:birthday
    }
    const input_test =schema_custumer.validate(customers_create,{ abortEarly: false })
    if(input_test.error){
        return res.sendStatus(400)
    }
    try{
        const already_have = await DB.query('SELECT * FROM customers WHERE cpf = $1',[cpf])
        if(already_have.rowCount !== 0){
            return res.sendStatus(409)
        }
    // end the midlle
    // controller
        const inserir = `INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`
        const g = await DB.query(inserir,[name,phone,cpf,birthday.format("yyyy-mm-dd")])
        console.log('done')
        return res.sendStatus(201)
    }catch(err){return res.status(500).send(err.message)}
    //controller end    
})
client.put('/customers/:id',async(req,res)=>{
    const {name,phone,cpf,birthday} = req.body
    const id = req.params.id
    try{
        await DB.query('UPDATE customers SET (name,phone,cpf,birthday) = ($1,$2,$3,$4) WHERE id = $5;',[name,phone,cpf,birthday,id])
        console.log('done')
        return res.sendStatus(201)
    }catch(err){return res.status(500).send(err.message)}

})
export default client
