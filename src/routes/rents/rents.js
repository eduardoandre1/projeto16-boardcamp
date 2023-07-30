import { Router, query } from "express";
import DB from "../../database/postgresSQL.js";
import  dayjs  from "dayjs";
const rents = Router()
rents.get("/rentals",async(req,res)=>{
    const {customerId,gameId,daysRented} = req.body
    try{
        const join = `
        SELECT * FROM games 
        JOIN rentals 
            ON games.id = rentals."gameId" 
        JOIN  customers
            ON customers.id = rentals."customerId";`
        const table = await DB.query(join)
        return res.status(200).send(table.rows)
    }catch(err){return res.status(500).send(err.message)}
})
rents.post("/rentals",async(req,res)=>{
    const {customerId,gameId,daysRented} = req.body
    const rentDate = dayjs().format("YYYY-MM-DD")
    const returnDate =null
    const delayFee = null
    
    if(daysRented < 0){
        return res.sendStatus(400)
    }
    try{
        const have_client = await DB.query('SELECT * FROM customers WHERE id = $1',[customerId])
        if(have_client.rowCount === 0){
            return res.sendStatus(400)
        }
        const have_game = await DB.query('SELECT * FROM games WHERE id = $1',[gameId])
        if(have_game.rowCount === 0){
            return res.sendStatus(400)
        }
        const originalPrice = Number(have_game.rows[0].pricePerDay)*Number(daysRented)
        const insert = `INSERT INTO rentals 
        ("customerId","gameId","daysRented","rentDate","returnDate","delayFee","originalPrice") 
        VALUES ($1,$2,$3,$4,$5,$6,$7)`
        const values = [customerId,gameId,daysRented,rentDate,returnDate,delayFee,originalPrice]
        await DB.query(insert,values)
        return res.sendStatus(201)
    }catch(error){
        console.log(error.message)
        return res.status(500).send(error.message)}
})

export default rents