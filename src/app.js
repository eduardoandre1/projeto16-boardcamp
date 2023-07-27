import cors from 'cors'
import express, { json } from 'express'
import router from './routes/router.js'
const app = express()

app.use(cors())
app.use(json())
app.use(router)
const port = process.env.PORT || 5000

app.listen(port,()=>console.log("api is working"))
