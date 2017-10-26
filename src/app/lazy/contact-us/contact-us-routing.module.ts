import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {ContactUsComponent} from './contact-us.component';
import {ContactUsPageDataResolver} from './contact-us.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContactUsComponent,
    resolve: {
      pageData: ContactUsPageDataResolver
    }
  }
];
export const ContactUsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
