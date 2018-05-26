import { JsonController, Get, Post, Put, Param, Body, HttpCode, NotFoundError } from 'routing-controllers'
import Game from './entity'
import { randomColor, listOfColors } from './constants'

@JsonController()
export default class GameController {

    @Get(`/games`)
    async getAllGames() {
        const games = await Game.find()
        return { games }
    }

    @Get(`games/:id`)
    getGameById(
        @Param(`id`) id: number
    ) {
        return Game.findOne(id)
    }

    @Post(`/games`)
    @HttpCode(201)
    createNewGameWithName(
        @Body() game: Game
    ) {
        game.color = randomColor()
        console.log(`Hi Adam! It's games/controller.ts here, This is what you game var looks like after a post request: ` + game)
        return game.save()
    }

    @Put(`/games/:id`)
    async editExistingGame(
        @Param(`id`) id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError(`Hi Adam! I'm in games/controller.ts - sorry, I can't find a game with id ${id}!`)

        return Game.merge(game, update).save()
    }

}