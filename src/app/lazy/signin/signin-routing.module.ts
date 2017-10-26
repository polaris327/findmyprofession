import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {SignInComponent} from './signin.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  }
];
export const SignInRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);