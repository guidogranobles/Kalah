"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GlobalGameInfo {
    constructor(idPlayer1 = 0, idPlayer2 = 0, namePlayer1 = '', namePlayer2 = '', currentPlayer = 1, currentPlayerName = '', gameStatus = '', secondPlayer = 0, boardP2Disabled = true, boardP1Disabled = true, gameInitiated = false) {
        this.idPlayer1 = idPlayer1;
        this.idPlayer2 = idPlayer2;
        this.namePlayer1 = namePlayer1;
        this.namePlayer2 = namePlayer2;
        this.currentPlayer = currentPlayer;
        this.currentPlayerName = currentPlayerName;
        this.gameStatus = gameStatus;
        this.secondPlayer = secondPlayer;
        this.boardP2Disabled = boardP2Disabled;
        this.boardP1Disabled = boardP1Disabled;
        this.gameInitiated = gameInitiated;
    }
}
exports.GlobalGameInfo = GlobalGameInfo;
;
//# sourceMappingURL=globalGameInfo.model.js.map