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
import { Router } from '@angular/router';
import { CoreUtilitiesService } from '../../../../core/services/core-utilities.service';
var HomeCareerAdviceComponent = /** @class */ (function () {
    function HomeCareerAdviceComponent(router, coreUtilities) {
        this.router = router;
        this.coreUtilities = coreUtilities;
        this.onArticleLikeToggle = new EventEmitter();
        this.selectedPackage = 'All Articles';
    }
    HomeCareerAdviceComponent.prototype.categoryChange = function (category) {
        this.router.navigate(["/" + category]);
    };
    HomeCareerAdviceComponent.prototype.toggleArticleLike = function ($event) {
        this.onArticleLikeToggle.emit($event);
    };
    HomeCareerAdviceComponent.prototype.openSelectedArticle = function ($event) {
        if ($event.newTab) {
            this.coreUtilities.openArticleInNewTab($event.url);
        }
        else {
            this.router.navigate(['/career-advice', $event.url]);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], HomeCareerAdviceComponent.prototype, "topArticles", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], HomeCareerAdviceComponent.prototype, "onArticleLikeToggle", void 0);
    HomeCareerAdviceComponent = __decorate([
        Component({
            selector: 'fmp-home-career-advice-component',
            templateUrl: 'home-career-advice.html',
            styles: [require('./home-career-advice.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [Router,
            CoreUtilitiesService])
    ], HomeCareerAdviceComponent);
    return HomeCareerAdviceComponent;
}());
export { HomeCareerAdviceComponent };
