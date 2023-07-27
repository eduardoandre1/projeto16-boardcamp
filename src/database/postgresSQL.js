import pg  from "pg";
import dotenv from "dotenv";
dotenv.config()
const {Pool} = pg;
const DB = new Pool({
    //user: 'bootcamp_role',
    //host:'localhost',
    //database:'boardcamp',
    //password:'eduardo',
    //port:5432,
    connectionString:'postgres://bootcamp_role:eduardo@localhost:5432/boardcamp' || process.env.DATABASE_URL

})
const server_status = DB.connect()
export default DB