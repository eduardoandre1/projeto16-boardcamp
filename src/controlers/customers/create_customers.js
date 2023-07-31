import DB from "../../database/postgresSQL.js";
import dayjs from "dayjs";
async function Create_customers(req,res){
    const {name,phone,cpf,birthday} = req.body
    const day_validate = dayjs(birthday).isValid()
    if(!day_validate){
        return res.sendStatus(400)
    }
    try{
        const already_have = await DB.query(`SELECT * FROM customers WHERE cpf = $1`,[cpf])
        if(already_have.rowCount !== 0){
            return res.sendStatus(409)
        }
    // end the midlle
    // controller
        const inserir = `INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`
        const g = await DB.query(inserir,[name,phone,cpf,birthday])
        console.log('done')
        return res.sendStatus(201)
    }catch(err){return res.status(500).send(err.message)}
}
export default Create_customers