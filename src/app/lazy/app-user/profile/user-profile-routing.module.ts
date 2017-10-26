import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {UserProfileHolderComponent} from './user-profile.component';
import {ProfileContentResolver} from './user-profile.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserProfileHolderComponent,
    resolve: {
      content: ProfileContentResolver
    }
  }
];

export const UserProfileRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);