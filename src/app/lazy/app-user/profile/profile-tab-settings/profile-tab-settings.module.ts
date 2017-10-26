import {NgModule} from '@angular/core';

import {ProfileTabSettingsComponent} from './profile-tab-settings.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProfileTabSettingsComponent
  ],
  exports: [
    ProfileTabSettingsComponent
  ]
})
export class ProfileTabSettingsModule {}
