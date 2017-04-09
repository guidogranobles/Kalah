
import { GlobalGameInfo } from '../models/globalGameInfo.model';
import { GameStatus } from '../models/gameStatus.model';
import * as game from '../actions/game.action';


export interface State {
  globalGameInfo: GlobalGameInfo,
  serverStatus: GameStatus
};

export const initialState: State = {
    globalGameInfo: new GlobalGameInfo(),
    serverStatus: new GameStatus()
};

export function reducer(state = initialState, action: game.Actions): State {

  switch (action.type) {
    case game.ActionTypes.START_GAME:  {
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


export const getGlobalGameInfo =  (state: State) => state.globalGameInfo;
export const getServerGameInfo =  (state: State) => state.serverStatus;
