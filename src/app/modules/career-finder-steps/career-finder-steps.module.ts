import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CareerFinderStepsComponent} from './career-finder-steps.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CareerFinderStepsComponent
  ],
  exports: [
    CareerFinderStepsComponent
  ]
})
export class CareerFinderStepsModule {}
