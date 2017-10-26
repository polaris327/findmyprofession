import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {Page404Component} from './page-404.component';

const routes: Routes = [
  {
    path: '',
    component: Page404Component
  }
];
export const Page404RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);