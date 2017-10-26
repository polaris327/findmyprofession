var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticlePreviewComponent } from "./article-preview/article-preview.component";
import { ArticlesCardsComponent } from "./articles-cards.component";
import { LikeIconModule } from '../like-icon/like-icon.module';
import { SharedModule } from '../../shared/shared.module';
var ArticleCardsModule = /** @class */ (function () {
    function ArticleCardsModule() {
    }
    ArticleCardsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule,
                LikeIconModule,
                SharedModule
            ],
            declarations: [
                ArticlePreviewComponent,
                ArticlesCardsComponent
            ],
            exports: [
                ArticlesCardsComponent
            ]
        })
    ], ArticleCardsModule);
    return ArticleCardsModule;
}());
export { ArticleCardsModule };
