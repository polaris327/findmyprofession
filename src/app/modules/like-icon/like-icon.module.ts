import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LikeIconComponent} from './like-icon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LikeIconComponent
  ],
  exports: [
    LikeIconComponent
  ]
})
export class LikeIconModule {}