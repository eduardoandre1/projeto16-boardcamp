import { Router } from 'express'
import schema_game from '../../schemas/schemas_game.js'
import input_validate from '../../middlewars/Input_validation.js'
import gamers_list from '../../controlers/games/games_list.js'
import Create_game from '../../controlers/games/Create_game.js'

const games = Router()

games.get('/games',gamers_list)
games.post('/games',input_validate(schema_game),Create_game)

export default games
