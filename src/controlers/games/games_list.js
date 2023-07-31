import DB from "../../database/postgresSQL.js"
async function gamers_list(req,res){ 
    try{
        const table = await DB.query('SELECT * FROM games ORDER BY id;')
        return res.status(200).send(table.rows)
    }catch(err){return res.status(500).send(err.message)}
    
}
export default gamers_list