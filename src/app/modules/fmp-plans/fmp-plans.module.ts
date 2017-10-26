import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FmpPlansComponent} from './fmp-plans.component';
import {RouterModule} from '@angular/router';
import {CustomLinkModule} from '../custom-link/custom-link.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CustomLinkModule
  ],
  declarations: [
    FmpPlansComponent
  ],
  exports: [
    FmpPlansComponent
  ]
})
export class FmpPlansModule {}
