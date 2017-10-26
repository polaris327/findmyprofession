var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BasketService } from './basket.service';
var PaymentService = /** @class */ (function () {
    function PaymentService(basketService) {
        var _this = this;
        this.basketService = basketService;
        this.payment$ = new BehaviorSubject(this.createPayment());
        this.basketService.basket$
            .filter(function (items) { return Array.isArray(items); })
            .subscribe(function (items) { return _this.updatePayment(); });
    }
    PaymentService_1 = PaymentService;
    PaymentService.prototype.removePromoCode = function () {
        var payment = this.payment$.getValue();
        if (payment) {
            payment.promo_code = null;
            PaymentService_1.calculateTotal(payment);
            this.payment$.next(payment);
            this.updatePayment();
        }
    };
    PaymentService.prototype.addPromoCode = function (promo) {
        var items = this.basketService.basket$.getValue();
        if (Array.isArray(items) && items.length) {
            var isValid = items.some(function (item) { return promo.services.some(function (promoService) { return promoService.id === item.id; }); });
            if (isValid) {
                var payment = this.payment$.getValue();
                if (payment) {
                    payment.promo_code = {
                        code: promo.code,
                        type: promo.type,
                        value: promo.value
                    };
                    PaymentService_1.calculateTotal(payment);
                    this.payment$.next(payment);
                    this.updatePayment();
                }
                return { status: true };
            }
            else {
                return { status: false, message: 'Coupon not valid with items.' };
            }
        }
        return { status: false, message: 'Your basket is empty' };
    };
    PaymentService.prototype.updatePayment = function () {
        var items = this.basketService.basket$.getValue();
        if (items) {
            var payment = this.payment$.getValue();
            var price = PaymentService_1.getBasketPrice(items);
            if (payment) {
                payment.sub_total = price;
            }
            PaymentService_1.calculateTotal(payment);
            this.payment$.next(payment);
        }
    };
    PaymentService.prototype.createPayment = function () {
        var payment = {
            sub_total: PaymentService_1.getBasketPrice(this.basketService.basket$.getValue())
        };
        PaymentService_1.calculateTotal(payment);
        return payment;
    };
    PaymentService.calculateTotal = function (payment) {
        if (payment.promo_code) {
            if (payment.promo_code.type === 'fixed') {
                payment.total = Math.round(payment.sub_total - payment.promo_code.value);
            }
            else {
                payment.total = +(payment.sub_total * ((100 - payment.promo_code.value) / 100));
            }
        }
        else {
            payment.total = payment.sub_total;
        }
    };
    PaymentService.getBasketPrice = function (items) {
        if (items && items.length > 0) {
            return items
                .map(function (item) { return item.price || 0; })
                .reduce(function (a, b) { return a + b; });
        }
        return 0;
    };
    PaymentService = PaymentService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [BasketService])
    ], PaymentService);
    return PaymentService;
    var PaymentService_1;
}());
export { PaymentService };
