import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestimonialsRoutingModule} from './testimonials-routing.module';
import {TestimonialsComponent} from './testimonials.component';
import {TestimonialsService} from './testimonials.service';
import {TestimonialsPageDataResolver} from './testimonials.resolver';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {RatingStarsModule} from '../../modules/rating-stars/rating-stars.module';
import {TruncateModule} from 'ng2-truncate';
import {CustomLinkModule} from '../../modules/custom-link/custom-link.module';

@NgModule({
  imports: [
    CommonModule,
    TestimonialsRoutingModule,
    NgbPaginationModule,
    RatingStarsModule,
    TruncateModule,
    CustomLinkModule
  ],
  providers: [
    TestimonialsPageDataResolver,
    TestimonialsService
  ],
  declarations: [
    TestimonialsComponent
  ],
  exports: [
    TestimonialsComponent
  ]
})
export class TestimonialsModule {}
