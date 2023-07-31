import { Router } from "express";
import games from "./games/games.js";
import rents from "./rents/rents.js";
import customers from "./customers/customers.js";

const router = Router()
router.use(games)
router.use(customers)
router.use(rents)
export default router