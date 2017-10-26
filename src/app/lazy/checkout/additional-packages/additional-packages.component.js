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
import { PaymentService } from '../../../core/services/payment.service';
var CheckoutAdditionalPackagesComponent = /** @class */ (function () {
    function CheckoutAdditionalPackagesComponent(paymentService) {
        var _this = this;
        this.paymentService = paymentService;
        this.onPackageRemove = new EventEmitter();
        this.paymentSubscription = this.paymentService.payment$
            .subscribe(function (payment) {
            _this.payment = payment;
        });
    }
    CheckoutAdditionalPackagesComponent.prototype.removePackage = function (item) {
        if (item) {
            this.onPackageRemove.emit(item);
        }
    };
    CheckoutAdditionalPackagesComponent.prototype.ngOnDestroy = function () {
        if (this.paymentSubscription) {
            this.paymentSubscription.unsubscribe();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CheckoutAdditionalPackagesComponent.prototype, "packages", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CheckoutAdditionalPackagesComponent.prototype, "price", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckoutAdditionalPackagesComponent.prototype, "onPackageRemove", void 0);
    CheckoutAdditionalPackagesComponent = __decorate([
        Component({
            selector: 'fmp-checkout-additional-packages',
            templateUrl: 'additional-packages.html',
            styles: [require('./additional-packages.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [PaymentService])
    ], CheckoutAdditionalPackagesComponent);
    return CheckoutAdditionalPackagesComponent;
}());
export { CheckoutAdditionalPackagesComponent };
