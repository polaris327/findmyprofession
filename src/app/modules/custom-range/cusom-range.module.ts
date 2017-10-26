import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomRangeComponent} from './custom-range.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CustomRangeComponent
  ],
  exports: [
    CustomRangeComponent
  ]
})
export class CustomRangeModule {}
