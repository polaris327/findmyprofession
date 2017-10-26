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
var ArticlesCardsComponent = /** @class */ (function () {
    function ArticlesCardsComponent() {
        this.isAuth = false;
        this.onArticleOpen = new EventEmitter();
        this.onArticleLike = new EventEmitter();
    }
    ArticlesCardsComponent.prototype.openArticle = function ($event) {
        this.onArticleOpen.emit($event);
    };
    ArticlesCardsComponent.prototype.articleLiked = function (state, id, index) {
        this.onArticleLike.emit({ state: state, id: id, index: index });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ArticlesCardsComponent.prototype, "articles", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ArticlesCardsComponent.prototype, "isAuth", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ArticlesCardsComponent.prototype, "onArticleOpen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ArticlesCardsComponent.prototype, "onArticleLike", void 0);
    ArticlesCardsComponent = __decorate([
        Component({
            selector: 'articles-cards-component',
            templateUrl: 'articles-cards.component.html',
            styles: [require('./articles-cards.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], ArticlesCardsComponent);
    return ArticlesCardsComponent;
}());
export { ArticlesCardsComponent };
