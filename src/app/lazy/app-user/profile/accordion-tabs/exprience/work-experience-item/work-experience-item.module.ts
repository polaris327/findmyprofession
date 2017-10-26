import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkExperienceItemComponent} from './work-experience-item.component';
import {ErrorModule} from '../../../../../../modules/error/error.module';
import {ProfileTabSettingsModule} from '../../../profile-tab-settings/profile-tab-settings.module';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorModule,
    ProfileTabSettingsModule,
    NgbDatepickerModule,
    CalendarModule
  ],
  declarations: [WorkExperienceItemComponent],
  exports: [WorkExperienceItemComponent],
})
export class WorkExperienceItemModule {}
