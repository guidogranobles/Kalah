import { Action } from '@ngrx/store';
import {GlobalGameInfo}  from '../models/globalGameInfo.model';
import { GameStatus } from '../models/gameStatus.model';
import { type } from '../util';


export const ActionTypes = {
  START_GAME :   type('[GameStatus] Start'),
  UPDATE_GAME:   type('[GameStatus] Update'),
  UPDATE_SERVER: type('[ServerStatus] Update')
};


export class GameStartAction implements Action {
  type = ActionTypes.START_GAME;

  constructor(public payload: GlobalGameInfo) { }
}

export class GameUpdateAction implements Action {
  type = ActionTypes.UPDATE_GAME;

  constructor(public payload: GlobalGameInfo) { }
}

export class ServerUpdateAction implements Action {
    type = ActionTypes.UPDATE_SERVER;

    constructor(public payload: GameStatus) { }
  }



export type Actions
  = GameStartAction
  | GameUpdateAction
  | ServerUpdateAction;

