import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {TemplateCarousel} from './template-carousel.component';
import {HomeCarouselComponent} from './home-carousel/home-carousel.component';
import {TestimonialsMinHolderComponent} from './testimonial-min-holder/testimonial-min-holder.component';
import {RatingStarsModule} from '../rating-stars/rating-stars.module';
import {CareerAdviceSliderItemComponent} from './career-advice-slider-item/career-advice-slider-item.component';
import { TruncateModule } from 'ng2-truncate';
import {LikeIconModule} from '../like-icon/like-icon.module';
import {CustomLinkModule} from '../custom-link/custom-link.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RatingStarsModule,
    TruncateModule,
    LikeIconModule,
    CustomLinkModule,
    SharedModule
  ],
  declarations: [
    TemplateCarousel,
    HomeCarouselComponent,
    TestimonialsMinHolderComponent,
    CareerAdviceSliderItemComponent
  ],
  exports: [
    TemplateCarousel
  ],
})

export class TemplateCarouselModule {
}
