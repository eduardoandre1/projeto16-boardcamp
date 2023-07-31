import DB from "../../database/postgresSQL.js";
async function Update_customers(req,res){
    const {name,phone,cpf,birthday} = req.body
    const id = req.params.id
    try{
        const already_have = await DB.query(`SELECT * FROM customers WHERE cpf = $1 AND id !=$2`,[cpf,id])
        if(already_have.rowCount !== 0){
            return res.sendStatus(409)
        }
        await DB.query('UPDATE customers SET (name,phone,cpf,birthday) = ($1,$2,$3,$4) WHERE id = $5;',[name,phone,cpf,birthday,id])
        console.log('done')
        return res.sendStatus(200)
    }catch(err){return res.status(500).send(err.message)}
}
export default Update_customers