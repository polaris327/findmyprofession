import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {JobItemComponent} from './job-item.component';
import {FormsModule} from '@angular/forms';
import {CustomDropdownModule} from '../../../../../modules/custom-dropdown/custom-dropdown.module';

@NgModule({
  imports: [
    CommonModule,
    CustomDropdownModule,
    FormsModule
  ],
  declarations: [
    JobItemComponent
  ],
  exports: [
    JobItemComponent
  ]
})
export class JobItemModule {}
