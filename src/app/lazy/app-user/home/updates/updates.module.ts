import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeUpdatesComponent} from './updates.component';
import {RouterModule} from '@angular/router';
import {UserJobsService} from '../../jobs/user-jobs.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    UserJobsService
  ],
  declarations: [
    HomeUpdatesComponent
  ],
  exports: [
    HomeUpdatesComponent
  ]
})
export class HomeUpdatesModule {}