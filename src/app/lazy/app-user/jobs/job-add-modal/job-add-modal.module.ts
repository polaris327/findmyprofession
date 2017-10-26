import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FmpAddJobComponent} from './job-add-modal.component';
import {JobAddErrors} from './job-add-modal-errors.model';
import {CircleIconLineModule} from '../../../../modules/circle-icon-line/circle-icon-line.module';
import {ErrorModule} from '../../../../modules/error/error.module';
import {ModelCloseIconModule} from '../../../../modules/modal-close-icon/modal-close-icon.module';
import {UserJobsService} from '../user-jobs.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CircleIconLineModule,
    ErrorModule,
    ModelCloseIconModule
  ],
  providers: [
    JobAddErrors,
    UserJobsService
  ],
  declarations: [
    FmpAddJobComponent
  ],
  exports: [
    FmpAddJobComponent
  ],
  entryComponents: [
    FmpAddJobComponent
  ]
})
export class JobAddModule {}
