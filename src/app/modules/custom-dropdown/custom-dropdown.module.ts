import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomDropdownComponent} from './custom-dropdown.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule
  ],
  declarations: [
    CustomDropdownComponent
  ],
  exports: [
    CustomDropdownComponent
  ]
})
export class CustomDropdownModule {}
