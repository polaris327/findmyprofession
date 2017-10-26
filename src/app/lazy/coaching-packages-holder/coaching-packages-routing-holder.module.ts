import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {CoachingPackagesHolderComponent} from './coaching-packages-holder.component';
import {CoachingPackagesHolderResolver} from './coaching-packages-holder.resolver';

const routes: Routes = [
  {
    path: '',
    component: CoachingPackagesHolderComponent,
    resolve: {
      list: CoachingPackagesHolderResolver
    },
    children: [
      {
        path: '',
        loadChildren: './coaching-package/coaching-package.module#CoachingPackageModule'
      }
    ]
  }
];

export const CoachingPackagesHolderRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
