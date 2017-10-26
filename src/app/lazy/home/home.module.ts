import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';

import {FormsModule} from '@angular/forms';
import {HomeComponent} from './home.component';
import {HomeDescriptionComponent} from './components/description/home-description.component';
import {HomePageDataResolver} from './home.resolver';
import {HomeJobOpportunitiesComponent} from './components/job-oportunities/job-opportunities.component';
import {FmpPlansModule} from '../../modules/fmp-plans/fmp-plans.module';
import {CustomRangeModule} from '../../modules/custom-range/cusom-range.module';
import {CareerFinderSliderModule} from '../../modules/career-finder-slider/career-finder-slider.module';
import {TemplateCarouselModule} from '../../modules/template-carousel/template-carousel.module';
import {CircleIconLineModule} from '../../modules/circle-icon-line/circle-icon-line.module';
import {FreeConsultationComponent} from './components/free-consultation-calendly/free-consultation-calendly.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    FmpPlansModule,
    CustomRangeModule,
    CareerFinderSliderModule,
    TemplateCarouselModule,
    CircleIconLineModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    HomeDescriptionComponent,
    HomeJobOpportunitiesComponent,
    FreeConsultationComponent
  ],
  providers: [
    HomePageDataResolver
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule{}
