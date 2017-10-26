import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {CareerAdviceComponent} from './career-advice.component';
import {CareerAdviceRoutingModule} from './career-advice-routing.module';
import {CareerAdviceService} from './career-advice.service';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {CareerAdviceDataResolver} from './career-advice.resolver';
import {TemplateCarouselModule} from '../../modules/template-carousel/template-carousel.module';
import {ArticleCardsModule} from "../../modules/articles-cards/articles-cards.module";
import {CareerAdviceTabsModule} from '../../modules/career-advice-tabs/career-advice-tabs.module';

@NgModule({
  imports: [
    CommonModule,
    CareerAdviceRoutingModule,
    RouterModule,
    NgbPaginationModule,
    TemplateCarouselModule,
    ArticleCardsModule,
    CareerAdviceTabsModule
  ],
  providers: [
    CareerAdviceService,
    CareerAdviceDataResolver
  ],
  declarations: [
    CareerAdviceComponent
  ],
  exports: [
    CareerAdviceComponent
  ]
})
export class CareerAdviceModule {}
