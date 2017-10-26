import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {PrivacyPolicyTermsComponent} from './privacy-policy-terms.component';
import {PrivacyTermsPageDataResolver} from './privacy-policy-terms.resolver';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyTermsComponent,
    resolve: {
      pageContent: PrivacyTermsPageDataResolver
    }
  }
];

export const PrivacyPolicyTermsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
