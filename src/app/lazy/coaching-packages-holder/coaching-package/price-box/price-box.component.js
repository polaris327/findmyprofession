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
var PriceBoxComponent = /** @class */ (function () {
    function PriceBoxComponent() {
        this.onBuy = new EventEmitter();
    }
    PriceBoxComponent.prototype.packageBuy = function (event) {
        var item = {
            plan: event.title,
            price: event.price,
            id: this.prices.id
        };
        this.onBuy.emit(item);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PriceBoxComponent.prototype, "prices", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PriceBoxComponent.prototype, "inBasket", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PriceBoxComponent.prototype, "onBuy", void 0);
    PriceBoxComponent = __decorate([
        Component({
            selector: 'fmp-price-box-component',
            templateUrl: 'price-box.component.html',
            styles: [require('./fmp-price-box.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], PriceBoxComponent);
    return PriceBoxComponent;
}());
export { PriceBoxComponent };
