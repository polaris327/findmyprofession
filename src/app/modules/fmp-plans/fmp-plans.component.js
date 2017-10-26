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
var FmpPlansComponent = /** @class */ (function () {
    function FmpPlansComponent() {
        /*Title of current plan*/
        this.isOpen = false;
        /**
         * Default link to route
         * @type {string}
         */
        this.defaultLink = 'career-finder';
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FmpPlansComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FmpPlansComponent.prototype, "description", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FmpPlansComponent.prototype, "plans", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FmpPlansComponent.prototype, "currentPlanTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FmpPlansComponent.prototype, "isOpen", void 0);
    FmpPlansComponent = __decorate([
        Component({
            selector: 'fmp-plans-component',
            templateUrl: 'fmp-plans.component.html',
            styles: [require('./fmp-plans.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], FmpPlansComponent);
    return FmpPlansComponent;
}());
export { FmpPlansComponent };
