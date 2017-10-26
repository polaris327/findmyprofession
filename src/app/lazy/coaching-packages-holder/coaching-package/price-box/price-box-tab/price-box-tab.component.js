var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
var PriceBoxTabComponent = /** @class */ (function () {
    function PriceBoxTabComponent() {
        this.isInBasket = false;
        this.onBuy = new EventEmitter();
    }
    PriceBoxTabComponent.prototype.buttonClicked = function () {
        this.onBuy.emit();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PriceBoxTabComponent.prototype, "tabData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PriceBoxTabComponent.prototype, "isInBasket", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PriceBoxTabComponent.prototype, "onBuy", void 0);
    PriceBoxTabComponent = __decorate([
        Component({
            selector: 'price-box-tab-component',
            templateUrl: 'price-box-tab.component.html'
        })
    ], PriceBoxTabComponent);
    return PriceBoxTabComponent;
}());
export { PriceBoxTabComponent };
