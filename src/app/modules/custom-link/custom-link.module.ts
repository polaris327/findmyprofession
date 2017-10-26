import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomLinkComponent} from './custom-link.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    CustomLinkComponent
  ],
  exports: [
    CustomLinkComponent
  ],
})
export class CustomLinkModule {}
