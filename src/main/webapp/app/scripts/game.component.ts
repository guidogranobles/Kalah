import {Component} from '@angular/core';
import { Router}       from '@angular/router';
import { GameServices} from './gameservices';
import {GameStatus}  from './gameStatus.model';
import {UpdateInfo}  from './updateInfo.model';

@Component({
    selector: 'kl-game',
    templateUrl: './app/html/game.html'


})
export class Game {

    errorMessage: string;
   // responseManager: (messageType: string, message: string) => void;

    idPlayer1: number = 0;
    idPlayer2: number = 0;
    namePlayer1: string;
    namePlayer2: string;
    currentPlayer: number = 0;
    currentPlayerName: string = "Let\'s play!";
    gameStatus: string = "";
    secondPlayer: number = 0;
    boardP2Disabled: boolean = true;
    boardP1Disabled: boolean = true;
    gameInitiated: boolean = false;

    gameCurrentStatus: GameStatus = new GameStatus();
    info: UpdateInfo;

    constructor(private gameService: GameServices) {

    }

    public play() {
        
        if((this.namePlayer1 && this.namePlayer1.length!=0)
                 && (this.namePlayer2 && this.namePlayer2.length!=0)){
                   
            this.gameService.startGameService(this.namePlayer1, this.namePlayer2).subscribe(
                gamePlay => this.responseProcessor(gamePlay, "start"),
                error => this.errorHandler(<any>error)
            );
            
        }else{
                alert("Please enter both players names");  
         }

        return false;
    }

    public emptyPit(idPit: number) {

        this.info = new UpdateInfo(this.currentPlayer, this.secondPlayer, this.gameCurrentStatus.idBoard, idPit);

        this.gameService.updateGameService(this.info).subscribe(
            gamePlay => this.responseProcessor(gamePlay, "play"),
            error => this.errorHandler(<any>error)
        );

        return false;
    }

    private errorHandler(error: string) {
        this.errorMessage = error;
        //this.responseManager('Error', this.errorMessage);
        console.log(error);
    }

    private responseProcessor(results: GameStatus, action: string) {
        if (results === null) {
            this.errorMessage = 'No results found';
           //this.responseManager('Info', this.errorMessage);
             console.log(this.errorMessage);
        } else {
            this.gameCurrentStatus = results;

            if (action === "start") {
                this.idPlayer1 = this.gameCurrentStatus.idPlayer1;
                this.idPlayer2 = this.gameCurrentStatus.idPlayer2;
                this.gameInitiated = true;
            }

            if (this.gameCurrentStatus.status === "next") {
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
                
                this.gameStatus = " is your turn!";
              
            } else if(this.gameCurrentStatus.status === "repeat") {
                 this.gameStatus = " is your turn again!!";
            } else if(this.gameCurrentStatus.status === "winner") {
                
                 if (this.gameCurrentStatus.idWinner === this.idPlayer1) {
                      this.currentPlayerName = this.namePlayer1;
                 }else{
                      this.currentPlayerName = this.namePlayer2;
                 }
                
                 this.gameStatus = " you are the winner!!!!";
                 this.gameInitiated = false;
                 this.boardP2Disabled = true;
                 this.boardP1Disabled = true;
            }

        }
    }

}