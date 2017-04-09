"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const http_2 = require("@angular/http");
const Rx_1 = require("rxjs/Rx");
let GameServices = class GameServices {
    constructor(http) {
        this.http = http;
        this.headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_2.RequestOptions({ headers: this.headers });
        this.serviceUrl = {
            startGame: '/kalahgame/rest/kalah/startGame',
            updateGame: '/kalahgame/rest/kalah/updateGame',
        };
    }
    startGameService(namePlayer1, namePlayer2) {
        let body = JSON.stringify([{ 'idplayer': null, 'name': namePlayer1 }, { 'idplayer': null, 'name': namePlayer2 }]);
        return this.http.post(this.serviceUrl.startGame, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateGameService(info) {
        let body = JSON.stringify({ 'idCurrentPlayer': info.idCurrentPlayer, 'idSecondPlayer': info.idSecondPlayer,
            'idBoard': info.idBoard, 'pitToEmpty': info.pitToEmpty });
        return this.http.post(this.serviceUrl.updateGame, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    extractData(res) {
        let body = res.json();
        return body || {};
    }
    handleError(error) {
        let errMsg = (error._body) ? JSON.parse(error._body) :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg.error);
        return Rx_1.Observable.throw(errMsg.error);
    }
};
GameServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], GameServices);
exports.GameServices = GameServices;
//# sourceMappingURL=gameservices.js.map