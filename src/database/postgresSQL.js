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
    //DATABASE_URL:'postgres://boardcamp:eduardo@localhost:5432/boardcamp'

})

export default DB 