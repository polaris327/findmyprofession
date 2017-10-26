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
var CareerAdviceSliderItemComponent = /** @class */ (function () {
    function CareerAdviceSliderItemComponent() {
        this.onLikeToggle = new EventEmitter();
        this.onArticleOpen = new EventEmitter();
        this.showBox = false;
    }
    CareerAdviceSliderItemComponent.prototype.toggleBox = function (state) {
        this.showBox = state;
    };
    CareerAdviceSliderItemComponent.prototype.toggleLike = function ($state) {
        this.onLikeToggle.emit($state);
    };
    CareerAdviceSliderItemComponent.prototype.openArticle = function (event, url) {
        this.emitOpenArticle({
            url: url,
            newTab: event.ctrlKey || event.metaKey
        });
    };
    CareerAdviceSliderItemComponent.prototype.handleRouterClick = function (event, url) {
        event.preventDefault();
        this.emitOpenArticle({
            url: url,
            newTab: event.ctrlKey || event.metaKey
        });
    };
    CareerAdviceSliderItemComponent.prototype.emitOpenArticle = function ($event) {
        this.onArticleOpen.emit($event);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CareerAdviceSliderItemComponent.prototype, "item", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CareerAdviceSliderItemComponent.prototype, "onLikeToggle", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CareerAdviceSliderItemComponent.prototype, "onArticleOpen", void 0);
    CareerAdviceSliderItemComponent = __decorate([
        Component({
            selector: 'career-advice-slider-item-component',
            templateUrl: 'career-advice-slider-item.component.html',
            styles: [require('./career-advice-slider-item.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], CareerAdviceSliderItemComponent);
    return CareerAdviceSliderItemComponent;
}());
export { CareerAdviceSliderItemComponent };
