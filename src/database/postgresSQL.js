import pg  from "pg";
import dotenv from "dotenv";
dotenv.config()
const {Pool} = pg;
const DB = new Pool({
    connectionString:process.env.DATABASE_URL || 'postgres://bootcamp_role:eduardo@localhost:5432/boardcamp'
})

export default DB