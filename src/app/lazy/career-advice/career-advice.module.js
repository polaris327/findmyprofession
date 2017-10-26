var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CareerAdviceComponent } from './career-advice.component';
import { CareerAdviceRoutingModule } from './career-advice-routing.module';
import { CareerAdviceService } from './career-advice.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CareerAdviceDataResolver } from './career-advice.resolver';
import { TemplateCarouselModule } from '../../modules/template-carousel/template-carousel.module';
import { ArticleCardsModule } from "../../modules/articles-cards/articles-cards.module";
import { CareerAdviceTabsModule } from '../../modules/career-advice-tabs/career-advice-tabs.module';
var CareerAdviceModule = /** @class */ (function () {
    function CareerAdviceModule() {
    }
    CareerAdviceModule = __decorate([
        NgModule({
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
    ], CareerAdviceModule);
    return CareerAdviceModule;
}());
export { CareerAdviceModule };
