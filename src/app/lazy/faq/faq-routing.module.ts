import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {FaqComponent} from './faq.component';
import {FaqPageResolver} from './faq.resolver';

const routes: Routes = [
  {
    path: '',
    component: FaqComponent,
    resolve: {
      pageData: FaqPageResolver
    }
  }
];
export const FaqRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);