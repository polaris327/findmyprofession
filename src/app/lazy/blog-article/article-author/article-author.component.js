var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation } from '@angular/core';
var ArticleAuthorComponent = /** @class */ (function () {
    function ArticleAuthorComponent() {
    }
    ArticleAuthorComponent.prototype.authorAvatarNotLoaded = function (event) {
        if (event.target) {
            event.target.src = require('../../../../assets/images/logo-company.png');
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ArticleAuthorComponent.prototype, "author", void 0);
    ArticleAuthorComponent = __decorate([
        Component({
            selector: 'article-author-component',
            templateUrl: 'article-author.html',
            styles: [require('./article-author.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], ArticleAuthorComponent);
    return ArticleAuthorComponent;
}());
export { ArticleAuthorComponent };
