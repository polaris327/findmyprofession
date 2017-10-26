import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {UserJobsComponent} from './user-jobs.component';
import {UserJobsResolver} from './user-jobs.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserJobsComponent,
    resolve: {
      price: UserJobsResolver
    }
  }
];

export const UserJobsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);