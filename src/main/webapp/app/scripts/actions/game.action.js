"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
exports.ActionTypes = {
    START_GAME: util_1.type('[GameStatus] Start'),
    UPDATE_GAME: util_1.type('[GameStatus] Update'),
    UPDATE_SERVER: util_1.type('[ServerStatus] Update')
};
/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
class GameStartAction {
    constructor(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.START_GAME;
    }
}
exports.GameStartAction = GameStartAction;
class GameUpdateAction {
    constructor(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.UPDATE_GAME;
    }
}
exports.GameUpdateAction = GameUpdateAction;
class ServerUpdateAction {
    constructor(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.UPDATE_SERVER;
    }
}
exports.ServerUpdateAction = ServerUpdateAction;
//# sourceMappingURL=game.action.js.map