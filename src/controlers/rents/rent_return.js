import DB from "../../database/postgresSQL.js"
import dayjs from "dayjs"

export default async function rent_return(req,res){
    const id = req.params.id
    const returnDate = dayjs().format('YYYY-MM-DD')
    try{
        const rent = await DB.query('SELECT * FROM rentals WHERE id = $1',[id])
        if(rent.rowCount !== 1){
            return res.sendStatus(404)
        }
        if(rent.rows[0].returnDate!== null){
            return res.sendStatus(400)
        }
        const valited_day = dayjs(rent.rows[0].rentDate).add(rent.rows[0].daysRented,'days').format('YYYY-MM-DD')
        const days_delay = dayjs(returnDate).diff(valited_day,'day')
        const price_per_day = Number(rent.rows[0].originalPrice)/(rent.rows[0].daysRented)
        const delayFee = Number(days_delay)*price_per_day > 0?Number(days_delay)*price_per_day:0
        await DB.query(`UPDATE rentals SET ("returnDate","delayFee") = ($1,$2) WHERE id = $3`,[returnDate,delayFee,id])
        return res.sendStatus(200) 
    }catch(err){return res.status(500).send(err.message)}
}