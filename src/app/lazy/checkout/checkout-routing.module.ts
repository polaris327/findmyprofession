import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {CheckoutComponent} from './checkout.component';
import {CheckoutPageResolver} from './chekout.resolver';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    resolve: {
      content: CheckoutPageResolver
    }
  }
];

export const CheckoutRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
