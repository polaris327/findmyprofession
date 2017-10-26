import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CircleIconLineModule} from "../circle-icon-line/circle-icon-line.module";
import {ModelCloseIconModule} from '../modal-close-icon/modal-close-icon.module';
import {TestimonialModalComponent} from './testimonial-modal.component';
import {RatingStarsModule} from '../rating-stars/rating-stars.module';
import {TruncateModule} from 'ng2-truncate';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    CircleIconLineModule,
    RouterModule,
    ModelCloseIconModule,
    RatingStarsModule,
    TruncateModule
  ],
  exports: [
    TestimonialModalComponent
  ],
  declarations: [
    TestimonialModalComponent
  ],
  entryComponents: [
    TestimonialModalComponent
  ]
})
export class TestimonialModalModule {}
