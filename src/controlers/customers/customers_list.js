import DB from "../../database/postgresSQL.js"

async function customers_list(req,res){ 
    try{
        const table = await DB.query(`SELECT id,name,phone,cpf,TO_CHAR(customers.birthday, 'YYYY-MM-DD') as birthday FROM customers ORDER BY id;`)
        return res.status(200).send(table.rows)
    }catch(err){return res.status(500).send(err.message)}
}
export default customers_list