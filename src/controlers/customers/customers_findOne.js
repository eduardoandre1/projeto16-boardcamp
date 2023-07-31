import DB from "../../database/postgresSQL.js"
import Joi from "joi"
async function Find_customer(req,res){ 
    const id = req.params.id
    const schema_id = Joi.object({id :Joi.number().integer().required()})
    const input_test =schema_id.validate({id},{ abortEarly: false })
    if(input_test.error){
        return res.sendStatus(400)
    }
    //end middleware
    //controler 
    try{
        const table = await DB.query(`SELECT id,name,phone,cpf,TO_CHAR(customers.birthday, 'YYYY-MM-DD') as birthday FROM customers WHERE id = $1;`,[id])
        if(table.rowCount !== 1){
            return res.sendStatus(404)
        }
        return res.status(200).send(table.rows[0])
    }catch(err){return res.status(500).send(err.message)}
    
}
export default Find_customer