const { Pool } = require("pg")
const dotenv = require("dotenv")
dotenv.config()
const connectDb = async () => {
    try {
        const pool = new Pool({
            DATABASE_URl: process.env.DATABASE_URl
        });
        const DB = await pool.connect()
        console.log('server online')
        return DB
    } catch (error) {
        console.log(error,'server erro')
    }
}
const DB = new Pool({
    DATABASE_URl: process.env.DATABASE_URl
})
module.exports = DB 