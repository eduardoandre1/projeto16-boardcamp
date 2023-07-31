import  Router from "express";
import rent_list from "../../controlers/rents/rent_list.js";
import rent_delete from "../../controlers/rents/rent_delete.js";
import create_rent from "../../controlers/rents/rent_create.js";
import rent_return from "../../controlers/rents/rent_return.js";

const rents = Router();
rents.get("/rentals",rent_list);
rents.post("/rentals",create_rent);
rents.post('/rentals/:id/return',rent_return);
rents.delete('/rentals/:id',rent_delete);

export default rents;