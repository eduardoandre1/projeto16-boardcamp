import { Router } from "express";
import games from "./games/games";

const router = Router()
router.use(games)

export default router