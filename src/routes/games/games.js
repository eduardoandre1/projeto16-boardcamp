import { Router } from 'express'
import DB from '../../database/postgresSQL.js'
import Joi from 'joi'

const games = Router()
games.get('/games',async(req,res)=>{ 
    const g = await DB.query('SELECT * FROM games;')
    return res.status(200).send(g.rows)
})

games.post('/games', async(req,res)=>{
    const {name,image,stockTotal,pricePerDay} = req.body
    const game_maker = {
        name: name,
        image: image,
        stockTotal: stockTotal,
        pricePerDay: pricePerDay,
    }
    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        stockTotal: Joi.number().min(1),
        pricePerDay:Joi.number().min(1)
    })
    const input_test =schema.validate(game_maker)
    try{
        if(input_test.error){
            if(!input_test.name){
                return res.status(422).send(input_test.error)
            }
            console.log(input_test.error)
            return res.send(input_test.error).status(400)//ainda tem que ver como diferenciar os erros
        }
        const inserir = 'INSERT INTO games ("name","image","stockTotal","pricePerDay") VALUES ($1,$2,$3,4$)'
        await DB.query(inserir,[game_maker.name,game_maker.image,game_maker.stockTotal,game_maker.pricePerDay])
        return res.status(201)
    }catch(err){return res.status(500).send(err.message)}
    

})

export default games