import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import {GameStatus}  from '../models/gameStatus.model';
import {UpdateInfo}  from '../models/updateInfo.model';



@Injectable()
export class GameServices {

     headers: Headers = new Headers({ 'Content-Type': 'application/json' });
     options: RequestOptions = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    
    private serviceUrl = {
        startGame: '/kalahgame/rest/kalah/startGame',
        updateGame: '/kalahgame/rest/kalah/updateGame',
    };

    startGameService(namePlayer1: string, namePlayer2: string): Observable<GameStatus> {
    	
        let body = JSON.stringify([{'idplayer': null, 'name': namePlayer1}, {'idplayer': null, 'name': namePlayer2}]);
       
        return this.http.post(this.serviceUrl.startGame , body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateGameService(info: UpdateInfo): Observable<GameStatus> {
        
        let body = JSON.stringify({'idCurrentPlayer': info.idCurrentPlayer, 'idSecondPlayer': info.idSecondPlayer,
                         'idBoard': info.idBoard, 'pitToEmpty': info.pitToEmpty});
       
        return this.http.post(this.serviceUrl.updateGame , body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
  
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    
    private handleError(error: any) {
        let errMsg = (error._body) ? JSON.parse(error._body) :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg.error);
        return Observable.throw(errMsg.error);
    }
}
