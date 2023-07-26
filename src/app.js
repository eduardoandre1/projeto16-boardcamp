const cors =require('cors')
const express = require('express')
const db =require('./database/postgresSQL.js')
const app = express()
app.use(cors())
app.use(express.json())
app.use()

const port = process.env.PORT || 5000
app.listen(port,()=>console.log("api is working"))