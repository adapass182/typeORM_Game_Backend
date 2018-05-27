import { JsonController, Get, Post, Put, Param, Body, HttpCode, BadRequestError, NotFoundError } from 'routing-controllers'
import Game from './entity'
import { randomColor, moves, listOfColors } from './constants'
import { validate } from 'class-validator'

@JsonController()
export default class GameController {

    @Get(`/games`)
    async getAllGames() {
        const games = await Game.find()
        return { games }
    }

    @Get(`/games/:id`)
    getGameById(
        @Param(`id`) id: number
    ) {
        return Game.findOne(id)
    }

    @Post(`/games`)
    @HttpCode(201)
    createNewGameWithName(
        @Body() createGame: Game
    ) {
        createGame.color = randomColor()
        return createGame.save()
    }

    @Put(`/games/:id`)
    async editExistingGame(
        @Param(`id`) id: number,
        @Body() update: Partial<Game>
    ) {
        const gameToUpdate = await Game.findOne(id)
        if (!gameToUpdate) throw new NotFoundError(`Hi Adam! I'm in games/controller.ts - sorry, I can't find a game with id ${id}!`)
        if (update.color && !listOfColors.includes(update.color)) throw new BadRequestError(`Sorry you can't use ${update.color}, try using one of these instead: ${listOfColors.join(", ")}`)
        if (update.board && moves(gameToUpdate.board, update.board) > 1) {
            throw new BadRequestError(`Ummmm... are you trying to cheat? Only one move at a time please!`)
        }
        const updatedGame = Game.merge(gameToUpdate, update)
        validate(updatedGame).then(errors => {
            if (errors.length > 0) {
                console.log(`Hey Adam, it's games/controller.ts here, I found one or more errors in your PUT endpoint so the validation has failed. Thought you might want to take a look :`, errors);
            } else {
                console.log(`Nailed it!`)
            }
        })
        return updatedGame.save()
    }

}