import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeCareerAdviceComponent} from './home-career-advice.component';
import {TemplateCarouselModule} from '../../../../modules/template-carousel/template-carousel.module';
import {CareerAdviceTabsModule} from '../../../../modules/career-advice-tabs/career-advice-tabs.module';

@NgModule({
  imports: [
    CommonModule,
    CareerAdviceTabsModule,
    TemplateCarouselModule
  ],
  declarations: [
    HomeCareerAdviceComponent
  ],
  exports: [
    HomeCareerAdviceComponent
  ]
})
export class HomeCareerAdviceModule {}