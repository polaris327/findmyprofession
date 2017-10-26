var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, Renderer2, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from '../../core/services/basket.service';
import { PaymentService } from '../../core/services/payment.service';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CheckoutService } from './checkout.service';
import { Subject } from 'rxjs/Subject';
import { PlatformCheckService } from '../../core/services/platform-check.service';
var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(route, basketService, paymentService, userService, fb, checkoutService, changeDetector, router, platformCheckService, domRenderer) {
        this.route = route;
        this.basketService = basketService;
        this.paymentService = paymentService;
        this.userService = userService;
        this.fb = fb;
        this.checkoutService = checkoutService;
        this.changeDetector = changeDetector;
        this.router = router;
        this.platformCheckService = platformCheckService;
        this.domRenderer = domRenderer;
        this.careerFinderPercent = 1;
        this.isRequestSending = false;
        this.isAuth = false;
        this.signInState = true;
        this.errorMessage = null;
        this.destroyed$ = new Subject();
        this.buildForm();
        this.createComponentSubscriptions();
    }
    CheckoutComponent.prototype.isSendBtnDisabled = function () {
        return !this.modelForm.get('amount').value || this.isRequestSending || !this.modelForm.get('agreement').value;
    };
    CheckoutComponent.prototype.authModelStateChanged = function (state) {
        this.modelForm.controls['authState'].setValue(state);
    };
    CheckoutComponent.prototype.paymentModelStateChanged = function (state) {
        this.modelForm.controls['paymentState'].setValue(state);
    };
    CheckoutComponent.prototype.paymentModelChanged = function (model) {
        this.modelForm.controls['paymentModel'].setValue(model);
    };
    CheckoutComponent.prototype.authModelChanged = function (credentials) {
        this.modelForm.controls['authModel'].setValue(credentials);
    };
    CheckoutComponent.prototype.ngOnInit = function () {
        if (this.paymentService) {
            this.paymentService.updatePayment();
        }
        if (this.platformCheckService.isBrowser) {
            this.loadStripeScript();
        }
    };
    CheckoutComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.changeDetector.detach();
    };
    CheckoutComponent.prototype.changeState = function (isSignIn) {
        this.signInState = isSignIn;
    };
    CheckoutComponent.prototype.removeItem = function (item) {
        this.basketService.removeItem(item);
        this.paymentService.updatePayment();
    };
    CheckoutComponent.prototype.createComponentSubscriptions = function () {
        this.createBasketSubscriptions(this.route.snapshot.data['content']);
        this.createPaymentSubscription();
        this.createUserSubscription();
        this.createAuthSubscription();
    };
    CheckoutComponent.prototype.createPaymentSubscription = function () {
        var _this = this;
        this.paymentService.payment$
            .takeUntil(this.destroyed$)
            .map(function (payment) { return payment.total; })
            .filter(function (total) { return !Number.isNaN(total); })
            .subscribe(function (total) { return _this.modelForm.controls['amount'].setValue(total); });
    };
    CheckoutComponent.prototype.createUserSubscription = function () {
        var _this = this;
        this.userService.user$
            .takeUntil(this.destroyed$)
            .subscribe(function (user) { return _this.user = user; });
    };
    CheckoutComponent.prototype.closeError = function () {
        this.errorMessage = '';
    };
    CheckoutComponent.prototype.sendRequest = function () {
        var _this = this;
        /**
         * Setting new value to that field , to ngOnChanges detect new value
         * @type {string}
         */
        this.isGlobalValidate = Date.now().toString();
        this.closeError();
        this.getModelTime = Date.now().toString();
        this.changeDetector.detectChanges();
        if (this.modelForm.valid) {
            var payer_info = this.getControlValue('paymentModel');
            var credentials = this.getControlValue('authModel');
            var payment_info = {
                amount: this.getControlValue('amount'),
                description: this.basketService.convertToDescription()
            };
            var payer_basket = this.basket.map(function (item) {
                return {
                    title: item.title,
                    price: item.price,
                    plan: item.plan,
                    id: item.id
                };
            });
            var promo = this.paymentService.payment$.getValue().promo_code;
            var discount = {
                code: promo ? promo.code : null
            };
            /**
             * Check for Career Finder percent and price
             */
            if (this.checkForCareerFinder(payer_basket, this.careerFinderPercent)) {
                this.isRequestSending = true;
                CheckoutService.createRequest(payer_info, credentials, payment_info, payer_basket, discount)
                    .flatMap(function (response) { return _this.checkoutService.sendRequest(response); })
                    .filter(function (paymentResponse) { return !!paymentResponse && !!paymentResponse.user; })
                    .finally(function () { return _this.isRequestSending = false; })
                    .subscribe(function (paymentResponse) { return _this.paymentExecuted(paymentResponse); }, function (error) { return _this.handleError(error); });
            }
        }
        else {
            this.errorMessage = "Payment form contain errors";
        }
    };
    CheckoutComponent.prototype.paymentExecuted = function (paymentResponse) {
        if (!this.isAuth) {
            this.userService.signIn(paymentResponse.user, true);
        }
        this.userService.user$.next(paymentResponse.user);
        this.modelForm.reset();
        this.paymentFormReset = Date.now().toString();
        this.basketService.clearBasket();
        this.isRequestSending = false;
        this.changeDetector.detectChanges();
        this.router.navigate(['/home']);
    };
    CheckoutComponent.prototype.createAuthSubscription = function () {
        var _this = this;
        this.userService.isAuth$
            .takeUntil(this.destroyed$)
            .subscribe(function (state) {
            if (_this.modelForm) {
                _this.modelForm.controls['authState'].setValue(state);
            }
            _this.isAuth = state;
        });
    };
    CheckoutComponent.prototype.getControlValue = function (name) {
        var control = this.modelForm.get(name);
        return control ? control.value : control;
    };
    CheckoutComponent.prototype.createBasketSubscriptions = function (packages) {
        var _this = this;
        if (packages) {
            var packageMap_1 = new Map();
            packages.forEach(function (item) {
                packageMap_1.set(item.id, item);
                if (item.id === 1) {
                    _this.careerFinderPercent = item.price_senior;
                }
            });
            this.basketService.basket$
                .takeUntil(this.destroyed$)
                .filter(function (items) { return Array.isArray(items); })
                .map(function (items) {
                items.forEach(function (item) {
                    var packageItem = packageMap_1.get(item.id);
                    if (packageItem) {
                        item.icon = packageItem.icon;
                    }
                });
                return items.slice();
            })
                .subscribe(function (items) { return _this.basket = items; });
        }
    };
    CheckoutComponent.prototype.handleError = function (error) {
        this.isRequestSending = false;
        this.errorMessage = error.message;
        this.changeDetector.detectChanges();
    };
    CheckoutComponent.prototype.buildForm = function () {
        this.modelForm = this.fb.group({
            authState: [this.isAuth || false, [
                    Validators.requiredTrue
                ]],
            authModel: [null],
            paymentState: [false, [
                    Validators.requiredTrue
                ]],
            paymentModel: [null],
            amount: [0, []],
            agreement: [false, [
                    Validators.requiredTrue
                ]]
        });
    };
    CheckoutComponent.prototype.checkForCareerFinder = function (list, percent) {
        if (percent === void 0) { percent = 1; }
        var finder = list.find(function (item) { return item.id === 1; });
        if (finder && percent) {
            var minValue = percent * 1000;
            if (+finder.plan !== percent) {
                this.errorMessage = 'Your Career Finder percent is different from current.';
                return false;
            }
            if (finder.price < minValue) {
                this.errorMessage = 'Your Career Finder price is too small.';
                return false;
            }
        }
        return true;
    };
    CheckoutComponent.prototype.loadStripeScript = function () {
        if (window && !window['isStripeScriptLoaded']) {
            var script = this.domRenderer.createElement('script');
            script.src = 'https://js.stripe.com/v2/';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            window['isStripeScriptLoaded'] = true;
        }
    };
    CheckoutComponent = __decorate([
        Component({
            selector: 'checkout-component',
            templateUrl: 'checkout.component.html',
            styles: [require('./checkout.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            BasketService,
            PaymentService,
            UserService,
            FormBuilder,
            CheckoutService,
            ChangeDetectorRef,
            Router,
            PlatformCheckService,
            Renderer2])
    ], CheckoutComponent);
    return CheckoutComponent;
}());
export { CheckoutComponent };
