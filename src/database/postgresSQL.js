const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config()
const connectDb = async () => {
    try {
        const pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });
        const DB = await pool.connect()
        console.log('server online')
        return DB
    } catch (error) {
        console.log(error)
    }
}
 
export default db =connectDb()