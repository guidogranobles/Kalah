import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {Game}           from './game.component';

export const appRoutes: Routes = [
  {
      path: '',
      component: Game 
  }
];

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);