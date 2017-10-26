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
var CareerFinderSliderComponent = /** @class */ (function () {
    function CareerFinderSliderComponent() {
        this.currentValue = 1000;
        this.onGetStarted = new EventEmitter();
        this.onCareerFinderDetailsOpen = new EventEmitter();
    }
    CareerFinderSliderComponent.prototype.getStartedClicked = function () {
        this.onGetStarted.emit();
    };
    CareerFinderSliderComponent.prototype.openCareerFinderDetails = function (event, url) {
        this.onCareerFinderDetailsOpen.emit({
            event: event, url: url
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CareerFinderSliderComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CareerFinderSliderComponent.prototype, "currentValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CareerFinderSliderComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CareerFinderSliderComponent.prototype, "description", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CareerFinderSliderComponent.prototype, "percent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CareerFinderSliderComponent.prototype, "footer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CareerFinderSliderComponent.prototype, "packagesTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CareerFinderSliderComponent.prototype, "packages", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CareerFinderSliderComponent.prototype, "serviceData", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CareerFinderSliderComponent.prototype, "onGetStarted", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CareerFinderSliderComponent.prototype, "onCareerFinderDetailsOpen", void 0);
    CareerFinderSliderComponent = __decorate([
        Component({
            selector: 'career-finder-slider-component',
            templateUrl: 'career-finder-slider.component.html',
            styles: [require('./career-finder-slider.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], CareerFinderSliderComponent);
    return CareerFinderSliderComponent;
}());
export { CareerFinderSliderComponent };
