import { Router } from 'express'
import DB from '../../database/postgresSQL.js'
import Joi from 'joi'
import schema_game from '../../schemas/schemas_game.js'

const games = Router()
games.get('/games',async(req,res)=>{ 
    try{
        const table = await DB.query('SELECT * FROM games;')
        return res.status(200).send(table.rows)
    }catch(err){return res.status(500).send(err.message)}
    
})

games.post('/games', async(req,res)=>{
    const {name,image,stockTotal,pricePerDay} = req.body
    // input validation 
    const game_maker = {
        name: name,
        image: image,
        stockTotal: stockTotal,
        pricePerDay: pricePerDay,
    }
    const input_test =schema_game.validate(game_maker)
    if(input_test.error){
        return res.status(400).send(input_test.error)
    }
    //
    try{
        const already_have = await DB.query("SELECT * FROM games WHERE name = $1",[name])
        console.log(already_have)
        if(already_have.rowCount !== 0){
            return res.sendStatus(409)
        }
        const inserir = 'INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1,$2,$3,$4)'
        const g = await DB.query(inserir,[game_maker.name,game_maker.image,game_maker.stockTotal,game_maker.pricePerDay])
        console.log('done')
        return res.sendStatus(201)
    }catch(err){return res.status(500).send(err.message)}
    

})

export default games
