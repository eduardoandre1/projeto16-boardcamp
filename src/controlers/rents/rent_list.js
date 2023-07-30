import DB from "../../database/postgresSQL.js";
import rent_list_formater from "./rent_list_formater.js";
import rent_list_join from "./rent_list_join.js";
async function rent_list(req,res){
    try{
        const table = await DB.query(rent_list_join)
        const table_formated = table.rows.map((object)=>rent_list_formater(object))
        return res.status(200).send(table_formated)
    }catch(err){return res.status(500).send(err.message)}
}
export default rent_list