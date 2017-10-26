var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
var ArticleTopArticlesComponent = /** @class */ (function () {
    function ArticleTopArticlesComponent() {
        this.onArticleOpen = new EventEmitter();
    }
    ArticleTopArticlesComponent.prototype.openArticle = function (event, url) {
        if (url) {
            event.preventDefault();
            this.onArticleOpen.emit({
                url: url,
                newTab: event.ctrlKey || event.metaKey
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ArticleTopArticlesComponent.prototype, "articles", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ArticleTopArticlesComponent.prototype, "onArticleOpen", void 0);
    ArticleTopArticlesComponent = __decorate([
        Component({
            selector: 'fmp-article-top-articles-component',
            templateUrl: 'top-articles.component.html',
            styles: [require('./top-articles.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], ArticleTopArticlesComponent);
    return ArticleTopArticlesComponent;
}());
export { ArticleTopArticlesComponent };
