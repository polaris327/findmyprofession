import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {UserFavoriteArticlesComponent} from './user-favorite-articles.component';

const routes: Routes = [
  {
    path: '',
    component: UserFavoriteArticlesComponent
  }
];
export const UserFavoriteArticlesRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
