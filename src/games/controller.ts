import { JsonController, Get, Post, Put, Param, Body, HttpCode, NotFoundError, BadRequestError } from 'routing-controllers'
import Game from './entity'
import { randomColor, moves } from './constants'
import { validate } from 'class-validator';

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
        console.log(`Hi Adam! It's games/controller.ts here. This is what your game looks like after a post request: ` + game)
        return game.save()
    }

    @Put(`/games/:id`)
    async editExistingGame(
        @Param(`id`) id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError(`Hi Adam! I'm in games/controller.ts - sorry, I can't find a game with id ${id}!`)
        if (update.board && moves(game.board, update.board) > 1) {
            throw new BadRequestError(`Ummmm... are you trying to cheat? Only one move at a time please!!!`)
        }
        const nugame = Game.merge(game, update)
        validate(nugame).then(errors => {
            if (errors.length > 0) {
                console.log(`Hey Adam, it's games/controller.ts here, I found one or more errors so the validation has failed. Thought you might want to take a look :`, errors);
            } else {
                console.log(`Nailed it!`)
                Game.merge(game, update).save()
            }
        })
    }

}