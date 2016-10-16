import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from  '@angular/http';
import { routing, appRoutingProviders } from './routers.provider';  
import {GameServices}    from './gameservices'; 

import {AppComponent}    from './app.component';
import {Game}           from './game.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule, routing, HttpModule ],
    declarations: [ AppComponent, Game  ],
    providers:    [ appRoutingProviders, GameServices ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }