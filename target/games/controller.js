"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const constants_1 = require("./constants");
const class_validator_1 = require("class-validator");
let GameController = class GameController {
    async getAllGames() {
        const games = await entity_1.default.find();
        return { games };
    }
    getGameById(id) {
        return entity_1.default.findOne(id);
    }
    createNewGameWithName(game) {
        game.color = constants_1.randomColor();
        console.log(`Hi Adam! It's games/controller.ts here. This is what your game looks like after a post request: ` + game);
        return game.save();
    }
    async editExistingGame(id, update) {
        const game = await entity_1.default.findOne(id);
        if (!game)
            throw new routing_controllers_1.NotFoundError(`Hi Adam! I'm in games/controller.ts - sorry, I can't find a game with id ${id}!`);
        const nugame = entity_1.default.merge(game, update);
        class_validator_1.validate(nugame).then(errors => {
            if (errors.length > 0) {
                console.log(`Hey Adam, it's games/controller.ts here, I found one or more errors so the validation has failed. Thought you might want to take a look :`, errors);
            }
            else {
                console.log(`Nailed it!`);
                entity_1.default.merge(game, update).save();
            }
        });
    }
};
__decorate([
    routing_controllers_1.Get(`/games`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getAllGames", null);
__decorate([
    routing_controllers_1.Get(`games/:id`),
    __param(0, routing_controllers_1.Param(`id`)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getGameById", null);
__decorate([
    routing_controllers_1.Post(`/games`),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "createNewGameWithName", null);
__decorate([
    routing_controllers_1.Put(`/games/:id`),
    __param(0, routing_controllers_1.Param(`id`)),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "editExistingGame", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
//# sourceMappingURL=controller.js.map