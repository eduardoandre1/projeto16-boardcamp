import pg  from "pg";
import dotenv from "dotenv";
dotenv.config()
const {Pool} = pg;
const DB = new Pool({
    connectionString:process.env.DATABASE_URL 
})

export default DB