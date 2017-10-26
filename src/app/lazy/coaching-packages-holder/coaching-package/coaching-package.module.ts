import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FmpPlansModule} from '../../../modules/fmp-plans/fmp-plans.module';
import {CoachingPackageComponent} from './coaching-package.component';
import {CoachingPackageRoutingModule} from './coaching-package-routing.module';
import {CoachingPackageResolver} from './coaching-package.resolver';
import {CareerFinderSliderModule} from '../../../modules/career-finder-slider/career-finder-slider.module';
import {PriceBoxModule} from './price-box/price-box.module';
import {TemplateCarouselModule} from '../../../modules/template-carousel/template-carousel.module';
import {TruncateModule} from 'ng2-truncate';

@NgModule({
  imports: [
    CommonModule,
    CoachingPackageRoutingModule,
    FmpPlansModule,
    CareerFinderSliderModule,
    PriceBoxModule,
    TemplateCarouselModule,
    TruncateModule
  ],
  providers: [
    CoachingPackageResolver
  ],
  declarations: [
    CoachingPackageComponent
  ],
  exports: [
    CoachingPackageComponent
  ]
})
export class CoachingPackageModule {}
