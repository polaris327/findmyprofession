import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {EducationItemComponent} from './education-experience-item.component';
import {ProfileTabSettingsModule} from '../../../profile-tab-settings/profile-tab-settings.module';
import {ErrorModule} from '../../../../../../modules/error/error.module';
import {CustomDropdownModule} from '../../../../../../modules/custom-dropdown/custom-dropdown.module';
import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileTabSettingsModule,
    ErrorModule,
    CustomDropdownModule,
    CalendarModule
  ],
  declarations: [
    EducationItemComponent
  ],
  exports: [
    EducationItemComponent
  ]
})
export class EducationExperienceItemModule {}