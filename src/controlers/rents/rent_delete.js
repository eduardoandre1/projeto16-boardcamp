import DB from "../../database/postgresSQL.js"
export default async function rent_delete(req,res){
    const id = req.params.id
    //middleware
    try{
        const already_have = await DB.query(`SELECT * FROM rentals WHERE id = $1`,[id])
        if(already_have.rowCount === 0){
            return res.sendStatus(409)
        }
        console.log(already_have.rows)
        if(already_have.rows[0].returnDate === null){
            return res.sendStatus(400)
        }
        //start controller
        await DB.query(`DELETE FROM rentals WHERE id = $1`,[id])
        return res.sendStatus(200)
        //end controller
    }catch(err){return res.status(500).send(err.message)}
}