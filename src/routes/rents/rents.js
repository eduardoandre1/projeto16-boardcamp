import  Router from "express";
import DB from "../../database/postgresSQL.js";
import  dayjs  from "dayjs";
import rent_list from "../../controlers/rents/rent_list.js";

const rents = Router()
rents.get("/rentals",rent_list)
rents.post("/rentals",async(req,res)=>{
    const {customerId,gameId,daysRented} = req.body
    const rentDate = dayjs().format("YYYY-MM-DD")
    const returnDate =null
    const delayFee = null
    // middleware
    if(daysRented <= 0){
        return res.sendStatus(400)
    }
    try{
        const have_client = await DB.query('SELECT * FROM customers WHERE id = $1',[customerId])
        if(have_client.rowCount !== 1){
            return res.sendStatus(400)
        }
        const have_game = await DB.query('SELECT * FROM games WHERE id = $1',[gameId])
        if(have_game.rowCount !== 1){
            return res.sendStatus(400)
        }
        //middleware ends
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
rents.post('/rentals/:id/return',async(req,res)=>{
    const id = req.params.id
    const returnDate = dayjs().format('YYYY-MM-DD')
    console.log(returnDate)
    try{
        const rent = await DB.query('SELECT * FROM rentals WHERE id = $1',[id])
        if(rent.rowCount !== 1){
            return res.sendStatus(404)
        }
        const valited_day = dayjs(rent.rows[0].rentDate).add(rent.rows[0].daysRented,'days').format('YYYY-MM-DD')
        const days_delay = dayjs(returnDate).diff(valited_day,'day')
        const price_per_day = Number(rent.rows[0].originalPrice)/(rent.rows[0].daysRented)
        const delayFee = Number(days_delay)*price_per_day > 0?Number(days_delay)*price_per_day:0
        await DB.query(`UPDATE rentals SET ("returnDate","delayFee") = ($1,$2) WHERE id = $3`,[returnDate,delayFee,id])
        return res.sendStatus(200) 
    }catch(err){return res.status(500).send(err.message)}
})
rents.delete('/rentals/:id',async(req,res)=>{
    const id = req.params.id
    console.log(id)
    //middleware
    try{
        const already_have = await DB.query(`SELECT * FROM rentals WHERE id = $1`,[id])
        if(already_have.rowCount === 0){
            return res.sendStatus(409)
        }
        const return_date = already_have[0].returnDate
        if(return_date !== null){
            return res.sendStatus(400)
        }
        // end middleware
        //start controller
        await DB.query(`DELETE FROM rentals WHERE id = $1`,[id])
        return res.sendStatus(200)
        //end controller
    }catch(err){return res.status(500).send(err.message)}
})

export default rents