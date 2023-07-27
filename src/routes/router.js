import { Router } from "express";
import games from "./games/games.js";
import client from "./client/clients.js";

const router = Router()
router.use(games)
router.use(client)
export default router