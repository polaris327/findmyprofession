import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {UserHomeComponent} from './user-home.component';
import {UserHomeDataResolver} from './user-home.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    resolve: {
      data: UserHomeDataResolver
    }
  }
];

export const UserHomeRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
