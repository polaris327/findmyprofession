import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CareerAdviceTabsComponent} from './career-advice-tabs.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    CareerAdviceTabsComponent
  ],
  exports: [
    CareerAdviceTabsComponent
  ]
})
export class CareerAdviceTabsModule {}
