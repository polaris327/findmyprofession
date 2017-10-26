import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {UserScheduleResolver} from './user-schedule.resolver';
import {UserScheduleComponent} from './user-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: UserScheduleComponent,
    resolve: {
      content: UserScheduleResolver
    }
  }
];

export const UserScheduleRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);