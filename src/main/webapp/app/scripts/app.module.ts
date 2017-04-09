import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from  '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';

import { routing, appRoutingProviders } from './routers.provider';  
import {GameServices}    from './services/gameservices'; 

import {AppComponent}    from './components/app.component';
import {GameComponent}           from './components/game.component';

import { reducer } from './reducers/index';


@NgModule({
    imports:      [ BrowserModule, FormsModule, routing, HttpModule, StoreModule.provideStore(reducer), RouterStoreModule.connectRouter()],
    declarations: [ AppComponent, GameComponent  ],
    providers:    [ appRoutingProviders, GameServices, StoreModule ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
