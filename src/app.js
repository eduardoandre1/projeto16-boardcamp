import cors from 'cors'
import express, { json } from 'express'
const app = express()

app.use(cors())
app.use(json())

const port = process.env.PORT || 5000
app.listen(port,()=>console.log("api is working"))