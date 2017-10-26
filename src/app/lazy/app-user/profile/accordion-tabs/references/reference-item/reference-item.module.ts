import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {ReferenceItemComponent} from './reference-item.component';
import {ErrorModule} from '../../../../../../modules/error/error.module';
import {InputPhoneNumberModule} from '../../../../../../modules/input-phone-number/input-phone-number.module';
import {ProfileTabSettingsModule} from "../../../profile-tab-settings/profile-tab-settings.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorModule,
    InputPhoneNumberModule,
    ProfileTabSettingsModule
  ],
  declarations: [
    ReferenceItemComponent
  ],
  exports: [
    ReferenceItemComponent
  ],
})
export class ReferenceItemModule {}
