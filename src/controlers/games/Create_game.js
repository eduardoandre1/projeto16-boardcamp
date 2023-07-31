
import DB from "../../database/postgresSQL.js"
async function Create_game(req,res){
    const {name,phone,cpf,birthday} = req.body
    try{
        const already_have = await DB.query("SELECT * FROM games WHERE name = $1",[name])
        console.log(already_have)
        if(already_have.rowCount !== 0){
            return res.sendStatus(409)
        }
        const inserir = 'INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1,$2,$3,$4)'
        const g = await DB.query(inserir,[name,image,stockTotal,pricePerDay])
        console.log('done')
        return res.sendStatus(201)
    }catch(err){return res.status(500).send(err.message)}
}
export default Create_game
