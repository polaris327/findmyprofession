import {NgModule} from '@angular/core';
import {PrivacyPolicyTermsRoutingModule} from './privacy-policy-terms-routing.module';
import {CommonModule} from '@angular/common';

import {PrivacyPolicyTermsComponent} from './privacy-policy-terms.component';
import {PrivacyTermsPageDataResolver} from './privacy-policy-terms.resolver';

@NgModule({
  imports: [
    PrivacyPolicyTermsRoutingModule,
    CommonModule
  ],
  providers: [
    PrivacyTermsPageDataResolver
  ],
  declarations: [
    PrivacyPolicyTermsComponent
  ],
  exports: [
    PrivacyPolicyTermsComponent
  ]
})
export class PrivacyPolicyTermsModule {}
