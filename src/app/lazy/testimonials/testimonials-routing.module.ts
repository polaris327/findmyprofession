import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TestimonialsComponent} from './testimonials.component';
import {TestimonialsPageDataResolver} from './testimonials.resolver';

const routes: Routes = [
  {
    path: '',
    component: TestimonialsComponent,
    resolve: {
      pageData: TestimonialsPageDataResolver
    }
  }
];
export const TestimonialsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
