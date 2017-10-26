import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserJobsComponent} from './user-jobs.component';
import {UserJobsRoutingModule} from './user-jobs-routing.module';
import {NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {UserJobsService} from './user-jobs.service';
import {JobListModule} from './job-list/job-list.module';
import {UserJobsResolver} from './user-jobs.resolver';

@NgModule({
  imports: [
    CommonModule,
    UserJobsRoutingModule,
    NgbTabsetModule,
    JobListModule
  ],
  providers: [
    UserJobsService,
    UserJobsResolver
  ],
  declarations: [
    UserJobsComponent
  ],
  exports: [
    UserJobsComponent
  ]
})
export class UserJobsModule {}