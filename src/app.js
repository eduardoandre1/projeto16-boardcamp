import cors from 'cors'
import express, { json } from 'express'
import DB from './database/postgresSQL.js'
const app = express()

app.use(cors())
app.use(json())

async function testserver(){ 
    const g = await DB.query('SELECT * FROM games;')
    console.log(g.rows)
}

testserver()
const port = process.env.PORT || 5000
app.listen(port,()=>console.log("api is working"))