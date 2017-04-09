"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalGameInfo_model_1 = require("../models/globalGameInfo.model");
const gameStatus_model_1 = require("../models/gameStatus.model");
const game = require("../actions/game.action");
;
exports.initialState = {
    globalGameInfo: new globalGameInfo_model_1.GlobalGameInfo(),
    serverStatus: new gameStatus_model_1.GameStatus()
};
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case game.ActionTypes.START_GAME: {
            return Object.assign({}, state, action.payload);
        }
        case game.ActionTypes.UPDATE_GAME: {
            return Object.assign({}, state, action.payload);
        }
        case game.ActionTypes.UPDATE_SERVER: {
            return Object.assign({}, state, action.payload);
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
exports.getGlobalGameInfo = (state) => state.globalGameInfo;
exports.getServerGameInfo = (state) => state.serverStatus;
//# sourceMappingURL=gameStatus.reducer.js.map