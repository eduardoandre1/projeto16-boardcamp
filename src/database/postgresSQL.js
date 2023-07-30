import pg  from "pg";
import dotenv from "dotenv";
dotenv.config()
const {Pool} = pg;
const DB = new Pool({
    connectionString:process.env.DATABASE_URL 
})
if (process.env.NODE_ENV === "production") DB.ssl = true;
export default DB