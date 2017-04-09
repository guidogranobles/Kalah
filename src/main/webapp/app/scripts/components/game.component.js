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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const gameservices_1 = require("../services/gameservices");
const gameStatus_model_1 = require("../models/gameStatus.model");
const updateInfo_model_1 = require("../models/updateInfo.model");
const store_1 = require("@ngrx/store");
const Actions = require("../actions/game.action");
const fromRoot = require("../reducers/index");
let GameComponent = class GameComponent {
    constructor(gameService, store) {
        this.gameService = gameService;
        this.idPlayer1 = 0;
        this.idPlayer2 = 0;
        this.namePlayer1 = '';
        this.namePlayer2 = '';
        this.currentPlayer = 1;
        this.currentPlayerName = '';
        this.gameStatus = '';
        this.secondPlayer = 0;
        this.boardP2Disabled = true;
        this.boardP1Disabled = true;
        this.gameInitiated = false;
        this.serverStatus = new gameStatus_model_1.GameStatus();
        this.store = store;
        this.store.select(fromRoot.getGlobalGameInfo).subscribe(globalGameInfo => {
            console.log(globalGameInfo.currentPlayerName);
        });
    }
    play() {
        if ((this.namePlayer1 && this.namePlayer1.length !== 0)
            && (this.namePlayer2 && this.namePlayer2.length !== 0)) {
            this.gameService.startGameService(this.namePlayer1, this.namePlayer2).subscribe(newServerStatus => this.responseProcessor(newServerStatus, 'start'), error => this.errorHandler(error));
        }
        else {
            alert('Please enter both players names');
        }
        return false;
    }
    emptyPit(idPit) {
        this.info = new updateInfo_model_1.UpdateInfo(this.currentPlayer, this.secondPlayer, this.serverStatus.idBoard, idPit);
        this.gameService.updateGameService(this.info).subscribe(newServerStatus => this.responseProcessor(newServerStatus, 'play'), error => this.errorHandler(error));
        return false;
    }
    errorHandler(error) {
        this.errorMessage = error;
        // this.responseManager('Error', this.errorMessage);
        console.log(error);
    }
    responseProcessor(results, action) {
        if (results === null) {
            this.errorMessage = 'No results found';
            // this.responseManager('Info', this.errorMessage);
            console.log(this.errorMessage);
        }
        else {
            this.serverStatus = results;
            if (action === 'start') {
                this.idPlayer1 = this.serverStatus.idPlayer1;
                this.idPlayer2 = this.serverStatus.idPlayer2;
                this.gameInitiated = true;
            }
            if (this.serverStatus.status === 'next') {
                if (this.currentPlayer === this.idPlayer1) {
                    this.currentPlayer = this.idPlayer2;
                    this.currentPlayerName = this.namePlayer2;
                    this.secondPlayer = this.idPlayer1;
                    this.boardP2Disabled = false;
                    this.boardP1Disabled = true;
                }
                else {
                    this.currentPlayer = this.idPlayer1;
                    this.currentPlayerName = this.namePlayer1;
                    this.secondPlayer = this.idPlayer2;
                    this.boardP2Disabled = true;
                    this.boardP1Disabled = false;
                }
                this.gameStatus = ' is your turn!';
            }
            else if (this.serverStatus.status === 'repeat') {
                this.gameStatus = ' is your turn again!!';
            }
            else if (this.serverStatus.status === 'winner') {
                if (this.serverStatus.idWinner === this.idPlayer1) {
                    this.currentPlayerName = this.namePlayer1;
                }
                else {
                    this.currentPlayerName = this.namePlayer2;
                }
                this.gameStatus = ' you are the winner!!!!';
                this.gameInitiated = false;
                this.boardP2Disabled = true;
                this.boardP1Disabled = true;
            }
        }
        this.updateGlobalState();
    }
    updateGlobalState() {
        this.store.dispatch({ type: Actions.ActionTypes.UPDATE_GAME,
            payload: {
                globalGameInfo: {
                    idPlayer1: this.idPlayer1,
                    idPlayer2: this.idPlayer2,
                    namePlayer1: this.namePlayer1,
                    namePlayer2: this.namePlayer2,
                    currentPlayer: this.currentPlayer,
                    currentPlayerName: this.currentPlayerName,
                    gameStatus: this.gameStatus,
                    secondPlayer: this.secondPlayer,
                    boardP2Disabled: this.boardP2Disabled,
                    boardP1Disabled: this.boardP1Disabled,
                    gameInitiated: this.gameInitiated
                }
            }
        });
    }
};
GameComponent = __decorate([
    core_1.Component({
        selector: 'kl-game',
        templateUrl: './app/html/game.html'
    }),
    __metadata("design:paramtypes", [gameservices_1.GameServices, store_1.Store])
], GameComponent);
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map