import { Router } from "express";
import games from "./games/games.js";
import client from "./client/clients.js";
import rents from "./rents/rents.js";

const router = Router()
router.use(games)
router.use(client)
router.use(rents)
export default router