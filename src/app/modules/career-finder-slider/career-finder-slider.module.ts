import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CareerFinderSliderComponent} from './career-finder-slider.component';
import {CustomRangeModule} from '../custom-range/cusom-range.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CustomRangeModule,
    RouterModule
  ],
  providers: [],
  declarations: [
    CareerFinderSliderComponent
  ],
  exports: [
    CareerFinderSliderComponent
  ]
})
export class CareerFinderSliderModule {}
