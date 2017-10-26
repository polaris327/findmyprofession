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
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/services/http.service';
import { STRIPE_CONFIG } from '../../core/configs/stripe.config';
import { COUPON_CHECK } from '../../core/models/api-urls.model';
import { CoreUtilitiesService } from '../../core/services/core-utilities.service';
var CheckoutService = /** @class */ (function () {
    function CheckoutService(httpService) {
        this.httpService = httpService;
    }
    CheckoutService.createRequest = function (payer_info, payer_credentials, payment_info, payer_basket, discount) {
        return Observable.create(function (observer) {
            Stripe.setPublishableKey(STRIPE_CONFIG.publish_key);
            Stripe.card.createToken(payer_info, function (status, response) {
                if (status === 200) {
                    observer.next({
                        payer_credentials: payer_credentials,
                        payment_info: {
                            description: payment_info.description,
                            amount: payment_info.amount,
                            currency: 'usd',
                            source: response.id
                        },
                        payer_basket: payer_basket,
                        discount: discount,
                        timezone: CoreUtilitiesService.getTimeZone()
                    });
                }
                else {
                    observer.error({
                        message: response.error.message,
                        status: status
                    });
                }
            });
        });
    };
    CheckoutService.prototype.sendRequest = function (payment) {
        var request = {
            method: 'POST',
            url: '/checkout',
            body: payment,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    CheckoutService.prototype.checkCoupon = function (code) {
        var request = {
            method: 'POST',
            url: COUPON_CHECK,
            body: { code: code },
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    CheckoutService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpService])
    ], CheckoutService);
    return CheckoutService;
}());
export { CheckoutService };
