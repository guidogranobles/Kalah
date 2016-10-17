import { PlayerBoard}  from './playerBoard.model';

export class GameStatus{

    constructor(
        public idPlayer1: number = 0,
        public idPlayer2: number = 0,
        public idBoard: string = "",
        public status: string = "",
        public idWinner: number = 0,
        public boardPlayer1: PlayerBoard = new PlayerBoard(),
        public boardPlayer2: PlayerBoard = new PlayerBoard()
        
    ){}
}
