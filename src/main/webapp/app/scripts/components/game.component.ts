import {Component} from '@angular/core';
import { GameServices} from '../services/gameservices';
import {GameStatus}  from '../models/gameStatus.model';
import {GlobalGameInfo}  from '../models/globalGameInfo.model';
import {UpdateInfo}  from '../models/updateInfo.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as Actions from '../actions/game.action';
import * as fromRoot from '../reducers/index';
import { deepCopy } from '../util';

@Component({
    selector: 'kl-game',
    templateUrl: './game.html',
    styleUrls: ['./game.css']


})
export class GameComponent {

    private store: Store<fromRoot.State>;

    public idPlayer1: number = 0;
    public idPlayer2: number = 0;
    public namePlayer1: string = '';
    public namePlayer2: string = '';
    public currentPlayer: number = 1;
    public currentPlayerName: string = '';
    public gameStatus: string = '';
    public secondPlayer: number = 0;
    public boardP2Disabled: boolean = true;
    public boardP1Disabled: boolean = true;
    public gameInitiated: boolean = false;

    serverStatus: GameStatus = new GameStatus();
 
    errorMessage: string;
   // responseManager: (messageType: string, message: string) => void;

    info: UpdateInfo;
  
    constructor(private gameService: GameServices, store: Store<fromRoot.State>) {
      
        this.store = store;
        this.store.select(fromRoot.getGlobalGameInfo).subscribe(globalGameInfo => {            
             console.log(globalGameInfo.currentPlayerName);               
        });
        
      
    }

    public play() {
        
        if ( (this.namePlayer1 && this.namePlayer1.length !== 0)
                 && (this.namePlayer2 && this.namePlayer2.length !== 0)) {

            this.gameService.startGameService(this.namePlayer1, this.namePlayer2).subscribe(
                newServerStatus => this.responseProcessor(newServerStatus, 'start'),
                error => this.errorHandler(<any>error)
            );

        }else {
                alert('Please enter both players names');
         }

        return false;
    }

    public emptyPit(idPit: number) {

        this.info = new UpdateInfo(this.currentPlayer, this.secondPlayer, this.serverStatus.idBoard, idPit);

        this.gameService.updateGameService(this.info).subscribe(
                newServerStatus => this.responseProcessor(newServerStatus, 'play'),
            error => this.errorHandler(<any>error)
        );

        return false;
    }

    private errorHandler(error: string) {
        this.errorMessage = error;
        // this.responseManager('Error', this.errorMessage);
        console.log(error);
    }

    private responseProcessor(results: GameStatus, action: string) {
        if (results === null) {
            this.errorMessage = 'No results found';
           // this.responseManager('Info', this.errorMessage);
             console.log(this.errorMessage);
        } else {
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
                } else {
                    this.currentPlayer = this.idPlayer1;
                    this.currentPlayerName = this.namePlayer1;
                    this.secondPlayer = this.idPlayer2;
                    this.boardP2Disabled = true;
                    this.boardP1Disabled = false;
                }

                this.gameStatus = ' is your turn!';

            } else if (this.serverStatus.status === 'repeat') {
                 this.gameStatus = ' is your turn again!!';
            } else if (this.serverStatus.status === 'winner') {

                 if (this.serverStatus.idWinner === this.idPlayer1) {
                       this.currentPlayerName = this.namePlayer1;
                 }else {
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
    
    
    private updateGlobalState(){
        
        
        this.store.dispatch({type: Actions.ActionTypes.UPDATE_GAME,                   
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

 }
