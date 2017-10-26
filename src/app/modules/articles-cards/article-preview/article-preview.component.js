var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
var ArticlePreviewComponent = /** @class */ (function () {
    function ArticlePreviewComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.isAuth = false;
        this.onArticleOpen = new EventEmitter();
        this.onArticleLike = new EventEmitter();
        this.defaultAvatar = require('../../../../assets/images/logo-company.png');
    }
    ArticlePreviewComponent.prototype.ngAfterViewInit = function () {
        while (this.description.nativeElement.offsetHeight > 75) {
            this.articleCard.description = this.articleCard.description.replace(/\W*\s(\S)*$/, '...');
            this.changeDetector.detectChanges();
        }
    };
    ArticlePreviewComponent.prototype.ngOnDestroy = function () {
        this.changeDetector.detach();
    };
    ArticlePreviewComponent.prototype.openArticle = function (event) {
        this.onArticleOpen.emit({
            url: this.articleCard.url,
            newTab: event ? event.ctrlKey || event.metaKey : false
        });
    };
    ArticlePreviewComponent.prototype.toggleLike = function ($event) {
        this.onArticleLike.emit($event);
    };
    ArticlePreviewComponent.prototype.authorAvatarNotLoaded = function (event) {
        if (event.target) {
            event.target.src = this.defaultAvatar;
        }
    };
    /**
     * Method to handle touch start on link
     * @param event
     */
    ArticlePreviewComponent.prototype.articleLinkTaped = function (event) {
        event.preventDefault();
        this.openArticle();
    };
    __decorate([
        ViewChild('description'),
        __metadata("design:type", Object)
    ], ArticlePreviewComponent.prototype, "description", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ArticlePreviewComponent.prototype, "articleCard", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ArticlePreviewComponent.prototype, "isAuth", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ArticlePreviewComponent.prototype, "onArticleOpen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ArticlePreviewComponent.prototype, "onArticleLike", void 0);
    ArticlePreviewComponent = __decorate([
        Component({
            selector: 'fmp-article-preview-component',
            templateUrl: 'article-preview.html',
            styles: [require('./article-preview.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], ArticlePreviewComponent);
    return ArticlePreviewComponent;
}());
export { ArticlePreviewComponent };
