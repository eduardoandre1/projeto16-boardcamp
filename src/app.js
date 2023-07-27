import cors from 'cors'
import express, { json } from 'express'
import DB from './database/postgresSQL.js'
const app = express()

app.use(cors())
app.use(json())

const port = process.env.PORT || 5000
app.listen(port,()=>console.log("api is working"))