import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {PasswordResetComponent} from './password-reset.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordResetComponent
  }
];
export const PasswordResetRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
