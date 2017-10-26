import {NgModule} from '@angular/core';
import {PasswordResetRoutingModule} from './password-reset-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PasswordResetComponent} from './password-reset.component';
import {ResetPasswordErrors} from './password-reset.model';
import {PasswordResetService} from './password-reset.service';
import {RouterModule} from '@angular/router';
import {ErrorModule} from '../../modules/error/error.module';

@NgModule({
  imports: [
    PasswordResetRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorModule
  ],
  providers: [
    ResetPasswordErrors,
    PasswordResetService
  ],
  declarations: [
    PasswordResetComponent
  ],
  exports: [
    PasswordResetComponent
  ]
})
export class PasswordResetModule {}
