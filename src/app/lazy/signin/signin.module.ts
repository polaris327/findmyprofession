import {NgModule} from '@angular/core';
import {SignInRoutingModule} from './signin-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SignInComponent} from './signin.component';
import {SignInErrors} from './signin.model';
import {SignInService} from './signin.service';
import {ErrorModule} from '../../modules/error/error.module';
import {CustomLinkModule} from '../../modules/custom-link/custom-link.module';

@NgModule({
  imports: [
    SignInRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorModule,
    CustomLinkModule
  ],
  providers: [
    SignInErrors,
    SignInService
  ],
  declarations: [
    SignInComponent
  ],
  exports: [
    SignInComponent
  ]
})
export class SignInModule{}

