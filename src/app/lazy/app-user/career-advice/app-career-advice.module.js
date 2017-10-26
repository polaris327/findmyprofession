var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CareerAdviceComponent } from './app-career-advice.component';
import { UserCareerAdviceRoutingModule } from './app-career-advice-routing.module';
import { UserCareerAdviceService } from './app-career-advice.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TemplateCarouselModule } from '../../../modules/template-carousel/template-carousel.module';
import { ArticleCardsModule } from '../../../modules/articles-cards/articles-cards.module';
import { CareerAdviceTabsModule } from '../../../modules/career-advice-tabs/career-advice-tabs.module';
var UserCareerAdviceModule = (function () {
    function UserCareerAdviceModule() {
    }
    UserCareerAdviceModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                UserCareerAdviceRoutingModule,
                RouterModule,
                NgbPaginationModule,
                TemplateCarouselModule,
                ArticleCardsModule,
                CareerAdviceTabsModule
            ],
            providers: [
                UserCareerAdviceService
            ],
            declarations: [
                CareerAdviceComponent
            ],
            exports: [
                CareerAdviceComponent
            ]
        })
    ], UserCareerAdviceModule);
    return UserCareerAdviceModule;
}());
export { UserCareerAdviceModule };
