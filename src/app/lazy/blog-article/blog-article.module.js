var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BlogArticleRoutingModule } from './blog-article-routing.module';
import { CommonModule } from '@angular/common';
import { BlogArticleComponent } from './blog-article.component';
import { BlogArticleDataResolver } from './blog-article.resolver';
import { ShareLinksComponent } from './share-links/share-links.component';
import { ArticleTopArticlesComponent } from './top-articles/top-articles.component';
import { SubscribeToArticleModule } from './subscribe-to-article/subscribe-to-article.module';
import { ArticleAuthorComponent } from './article-author/article-author.component';
import { ArticleCardsModule } from "../../modules/articles-cards/articles-cards.module";
import { LikeIconModule } from '../../modules/like-icon/like-icon.module';
import { CustomLinkModule } from '../../modules/custom-link/custom-link.module';
import { SharedModule } from '../../shared/shared.module';
var BlogArticleModule = /** @class */ (function () {
    function BlogArticleModule() {
    }
    BlogArticleModule = __decorate([
        NgModule({
            imports: [
                BlogArticleRoutingModule,
                CommonModule,
                SubscribeToArticleModule,
                ArticleCardsModule,
                LikeIconModule,
                CustomLinkModule,
                SharedModule
            ],
            providers: [
                BlogArticleDataResolver
            ],
            declarations: [
                BlogArticleComponent,
                ShareLinksComponent,
                ArticleTopArticlesComponent,
                ArticleAuthorComponent
            ],
            exports: [
                BlogArticleComponent
            ]
        })
    ], BlogArticleModule);
    return BlogArticleModule;
}());
export { BlogArticleModule };
