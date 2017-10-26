import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CareerFinderStepsModalComponent} from './career-finder-steps-modal.component';
import {CareerFinderStepsModule} from '../career-finder-steps/career-finder-steps.module';
import {CircleIconLineModule} from '../circle-icon-line/circle-icon-line.module';
import {CareerFinderSliderModule} from '../career-finder-slider/career-finder-slider.module';
import {ModelCloseIconModule} from '../modal-close-icon/modal-close-icon.module';

@NgModule({
  imports: [
    CommonModule,
    CareerFinderStepsModule,
    CircleIconLineModule,
    CareerFinderSliderModule,
    ModelCloseIconModule
  ],
  declarations: [
    CareerFinderStepsModalComponent
  ],
  entryComponents: [
    CareerFinderStepsModalComponent
  ],
  exports: [
    CareerFinderStepsModalComponent
  ]
})
export class CareerFinderStepsModalModule {}
