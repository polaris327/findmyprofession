import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {CareerFinderCongratulationComponent} from './career-finder-congratulation.component';
import {CongratulationCareerFinderResolver} from './career-finder-congratulation.resolver';

const routes: Routes = [
  {
    path: '',
    component: CareerFinderCongratulationComponent,
    resolve: {
      content: CongratulationCareerFinderResolver
    }
  }
];

export const CareerFinderCongratulationRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
