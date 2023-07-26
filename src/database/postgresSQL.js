import pg  from "pg";
import dotenv from "dotenv";
dotenv.config()
const {Pool} = pg;
const DB = new pg.Pool({
    user: 'bootcamp_role',
    host:'localhost',
    database:'boardcamp',
    password:'eduardo',
    port:5432

})

export default DB 