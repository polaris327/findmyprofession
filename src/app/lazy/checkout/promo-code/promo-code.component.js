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
import { PaymentService } from '../../../core/services/payment.service';
import { CheckoutService } from '../checkout.service';
import { Subject } from 'rxjs/Subject';
var PromoCodeComponent = /** @class */ (function () {
    function PromoCodeComponent(paymentService, checkoutService) {
        this.paymentService = paymentService;
        this.checkoutService = checkoutService;
        this.placeholder = 'Promo Code';
        this.errorMessage = null;
        this.destroyed$ = new Subject();
        this.subscribeToPayment();
    }
    PromoCodeComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.paymentService.removePromoCode();
    };
    PromoCodeComponent.prototype.closeError = function () {
        this.errorMessage = null;
    };
    PromoCodeComponent.prototype.checkPromoCode = function () {
        var _this = this;
        this.checkoutService.checkCoupon(this.promo_code)
            .map(function (response) {
            response.code = _this.promo_code;
            return response;
        })
            .subscribe(function (response) {
            var promo = _this.paymentService.addPromoCode(response);
            if (!promo.status) {
                _this.errorMessage = promo.message;
            }
            else {
                _this.closeError();
            }
        }, function (error) { return _this.errorMessage = error.body; });
    };
    PromoCodeComponent.prototype.subscribeToPayment = function () {
        var _this = this;
        this.paymentService.payment$
            .takeUntil(this.destroyed$)
            .subscribe(function (payment) {
            _this.payment = payment;
            if (_this.payment && _this.payment.promo_code) {
                _this.promo_code = payment.promo_code.code;
            }
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PromoCodeComponent.prototype, "placeholder", void 0);
    PromoCodeComponent = __decorate([
        Component({
            selector: 'fmp-promo-code-component',
            templateUrl: 'promo-code.html',
            styles: [require('./promo-code.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [PaymentService,
            CheckoutService])
    ], PromoCodeComponent);
    return PromoCodeComponent;
}());
export { PromoCodeComponent };
