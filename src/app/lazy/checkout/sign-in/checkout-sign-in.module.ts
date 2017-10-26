import {NgModule} from '@angular/core';

import {CheckoutSignInComponent} from './checkout-sign-in.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CheckoutSignInErrors} from './checkout-sign-in.model';
import {RouterModule} from '@angular/router';
import {PaymentInfoErrors} from '../payment-info/payment-info-errors.model';
import {ErrorModule} from '../../../modules/error/error.module';
import {CustomLinkModule} from '../../../modules/custom-link/custom-link.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorModule,
    CustomLinkModule
  ],
  providers: [
    CheckoutSignInErrors,
    PaymentInfoErrors
  ],
  declarations: [
    CheckoutSignInComponent
  ],
  exports: [
    CheckoutSignInComponent
  ],
})
export class CheckoutSignInModule {}
