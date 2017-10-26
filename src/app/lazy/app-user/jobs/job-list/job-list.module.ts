import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {JobListComponent} from './job-list.component';
import {JobItemModule} from './job-item/job-item.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomDropdownModule} from '../../../../modules/custom-dropdown/custom-dropdown.module';
import {CareerFinderStepsModule} from '../../../../modules/career-finder-steps/career-finder-steps.module';

@NgModule({
  imports: [
    CommonModule,
    JobItemModule,
    CustomDropdownModule,
    NgbPaginationModule,
    CareerFinderStepsModule
  ],
  declarations: [
    JobListComponent,
  ],
  exports: [
    JobListComponent
  ]
})
export class JobListModule {}