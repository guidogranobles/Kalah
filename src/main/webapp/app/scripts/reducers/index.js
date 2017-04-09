"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reselect_1 = require("reselect");
const fromRouter = require("@ngrx/router-store");
const environment_1 = require("../../environments/environment");
const compose_1 = require("@ngrx/core/compose");
const ngrx_store_freeze_1 = require("ngrx-store-freeze");
const store_1 = require("@ngrx/store");
const fromGameStatus = require("./gameStatus.reducer");
const reducers = {
    gameStatus: fromGameStatus.reducer,
    router: fromRouter.routerReducer
};
const developmentReducer = compose_1.compose(ngrx_store_freeze_1.storeFreeze, store_1.combineReducers)(reducers);
const productionReducer = store_1.combineReducers(reducers);
function reducer(state, action) {
    if (environment_1.environment.production) {
        return productionReducer(state, action);
    }
    else {
        return developmentReducer(state, action);
    }
}
exports.reducer = reducer;
exports.getGameStatus = (state) => state.gameStatus;
exports.getGlobalGameInfo = reselect_1.createSelector(exports.getGameStatus, fromGameStatus.getGlobalGameInfo);
exports.getServerGameInfo = reselect_1.createSelector(exports.getGameStatus, fromGameStatus.getServerGameInfo);
//# sourceMappingURL=index.js.map