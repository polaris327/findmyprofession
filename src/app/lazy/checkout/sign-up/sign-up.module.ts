import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {SignUpComponent} from './sign-up.component';
import {SignUpErrors} from './sign-up.model';
import {ErrorModule} from '../../../modules/error/error.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorModule
  ],
  providers: [
    SignUpErrors
  ],
  declarations: [
    SignUpComponent
  ],
  exports: [
    SignUpComponent
  ]
})
export class SignUpModule {
}
