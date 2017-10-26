import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {AboutPageResolver} from './about.resolver';
import {AboutComponent} from './about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    resolve: {
      page: AboutPageResolver
    }
  }
];

export const AboutRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);