import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GameComponent}           from './components/game.component';

export const appRoutes: Routes = [
  {
      path: '',
      component: GameComponent 
  }
];

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
