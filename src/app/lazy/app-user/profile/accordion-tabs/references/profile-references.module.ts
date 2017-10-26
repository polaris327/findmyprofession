import {NgModule} from '@angular/core';

import {ProfileReferenceComponent} from './profile-references.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorModule} from '../../../../../modules/error/error.module';
import {ReferenceItemModule} from './reference-item/reference-item.module';
import {InputPhoneNumberModule} from '../../../../../modules/input-phone-number/input-phone-number.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorModule,
    ReferenceItemModule,
    InputPhoneNumberModule
  ],
  declarations: [
    ProfileReferenceComponent
  ],
  exports: [
    ProfileReferenceComponent
  ],
})
export class ProfileReferenceModule {}
