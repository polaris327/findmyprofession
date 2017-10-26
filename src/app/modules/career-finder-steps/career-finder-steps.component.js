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
var CareerFinderStepsComponent = /** @class */ (function () {
    function CareerFinderStepsComponent() {
        this.buttonText = 'Have FMP Apply';
        this.onButtonClicked = new EventEmitter();
    }
    CareerFinderStepsComponent.prototype.buttonClicked = function () {
        this.onButtonClicked.emit();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CareerFinderStepsComponent.prototype, "buttonText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CareerFinderStepsComponent.prototype, "type", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CareerFinderStepsComponent.prototype, "onButtonClicked", void 0);
    CareerFinderStepsComponent = __decorate([
        Component({
            selector: 'fmp-career-finder-steps-component',
            templateUrl: 'career-finder-steps.html',
            styles: [require('./career-finder-steps.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], CareerFinderStepsComponent);
    return CareerFinderStepsComponent;
}());
export { CareerFinderStepsComponent };
