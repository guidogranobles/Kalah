import { GameStatus } from '../models/gameStatus.model';

export class GlobalGameInfo {

      constructor(
         public idPlayer1: number = 0,
         public idPlayer2: number = 0,
         public namePlayer1: string = '',
         public namePlayer2: string = '',
         public currentPlayer: number = 1,
         public currentPlayerName: string = '',
         public gameStatus: string = '',
         public secondPlayer: number = 0,
         public boardP2Disabled: boolean = true,
         public boardP1Disabled: boolean = true,
         public gameInitiated: boolean = false
       ){}
};