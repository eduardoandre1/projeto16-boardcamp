import { Router } from "express";
import games from "./games/games.js";

const router = Router()
router.use(games)

export default router