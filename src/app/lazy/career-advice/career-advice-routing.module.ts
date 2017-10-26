import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {CareerAdviceComponent} from './career-advice.component';
import {CareerAdviceDataResolver} from './career-advice.resolver';

const routes: Routes = [
  {
    path: '',
    component: CareerAdviceComponent,
    resolve: {
      pageContent: CareerAdviceDataResolver
    }
  }
];
export const CareerAdviceRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);