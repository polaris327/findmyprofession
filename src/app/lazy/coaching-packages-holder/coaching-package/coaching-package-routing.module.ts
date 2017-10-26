import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {CoachingPackageComponent} from './coaching-package.component';
import {CoachingPackageResolver} from './coaching-package.resolver';

const routes: Routes = [
  {
    path: '',
    component: CoachingPackageComponent,
    resolve: {
      pageData: CoachingPackageResolver
    }
  }
];
export const CoachingPackageRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
