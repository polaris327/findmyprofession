import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {HomeComponent} from './home.component';
import {HomePageDataResolver} from './home.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      pageData: HomePageDataResolver
    }
  }
];
export const HomeRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
