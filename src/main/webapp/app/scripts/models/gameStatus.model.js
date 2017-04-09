"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playerBoard_model_1 = require("./playerBoard.model");
class GameStatus {
    constructor(idPlayer1 = 0, idPlayer2 = 0, idBoard = '', status = '', idWinner = 0, boardPlayer1 = new playerBoard_model_1.PlayerBoard(), boardPlayer2 = new playerBoard_model_1.PlayerBoard()) {
        this.idPlayer1 = idPlayer1;
        this.idPlayer2 = idPlayer2;
        this.idBoard = idBoard;
        this.status = status;
        this.idWinner = idWinner;
        this.boardPlayer1 = boardPlayer1;
        this.boardPlayer2 = boardPlayer2;
    }
}
exports.GameStatus = GameStatus;
//# sourceMappingURL=gameStatus.model.js.map