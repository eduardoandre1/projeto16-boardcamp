
import { Router} from "express";
import schema_custumer from "../../schemas/schemas_customers.js";
import customers_list from "../../controlers/customers/customers_list.js";
import Find_customer from "../../controlers/customers/customers_findOne.js";
import Create_customers from "../../controlers/customers/create_customers.js";
import input_validate from "../../middlewars/Input_validation.js";
import Update_customers from "../../controlers/customers/customers_update.js";

const customers = Router()

customers.get('/customers',customers_list)
customers.get('/customers/:id',Find_customer)
customers.post('/customers',input_validate(schema_custumer),Create_customers)
customers.put('/customers/:id',input_validate(schema_custumer),Update_customers)

export default customers
