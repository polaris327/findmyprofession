var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { BasketService } from '../../core/services/basket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { PaymentService } from '../../core/services/payment.service';
import { PlatformCheckService } from '../../core/services/platform-check.service';
import { Subject } from 'rxjs/Subject';
var CareerFinderCongratulationComponent = /** @class */ (function () {
    function CareerFinderCongratulationComponent(route, basketService, router, userService, paymentService, changeDetector, platformCheck) {
        var _this = this;
        this.route = route;
        this.basketService = basketService;
        this.router = router;
        this.userService = userService;
        this.paymentService = paymentService;
        this.changeDetector = changeDetector;
        this.platformCheck = platformCheck;
        this.careerFinderPrice = 1000;
        this.sliderPercent = 1;
        this.destroyed$ = new Subject();
        this.isComponentInited = false;
        this.careerFinderPackage = {
            id: 1,
            title: 'Career Finder',
            plan: '',
            price: 0,
            icon: 'career-finder'
        };
        this.checkForToken();
        var allPackages = route.snapshot.data['content'];
        var sortedPackages = [];
        allPackages.forEach(function (element) {
            if (element.id === 1) {
                /**
                 * Finding Career Finder
                 * @type {number}
                 */
                var price = element.price_senior;
                _this.sliderPercent = price;
                _this.careerFinderPackage.price = price;
                _this.careerFinderPackage.plan = price.toString();
            }
            else {
                sortedPackages.push(element);
            }
        });
        this.createSubscriptions();
        this.setLocalPackages(sortedPackages);
    }
    CareerFinderCongratulationComponent_1 = CareerFinderCongratulationComponent;
    CareerFinderCongratulationComponent.prototype.ngOnInit = function () {
        if (this.platformCheck.isBrowser) {
            this.isComponentInited = true;
        }
        this.checkForBasket();
    };
    CareerFinderCongratulationComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.changeDetector.detach();
    };
    /**
     * Method to set package to basket that selected.
     * @param event
     */
    CareerFinderCongratulationComponent.prototype.packageSelected = function (event) {
        if (event) {
            if (!event.isSelected) {
                var index_1 = 0;
                var contain = this.basket.filter(function (item, _index) {
                    if (item.title === event.fmpPlan.title) {
                        index_1 = _index;
                    }
                    return item.title === event.fmpPlan.title;
                })[0];
                if (contain) {
                    this.basketService.removeItemByIndex(index_1);
                }
            }
            else {
                var item = CareerFinderCongratulationComponent_1.getItemFromEvent(event);
                this.basketService.addNewItem(item);
            }
        }
    };
    /**
     * Parse object to specific model
     * @param event
     * @returns {{title: string, plan: string, price: number, icon: string, id: (number|string)}}
     */
    CareerFinderCongratulationComponent.getItemFromEvent = function (event) {
        return {
            title: event.fmpPlan.title,
            plan: event.fmpPlan.selectedType.title,
            price: +event.fmpPlan.selectedType.price,
            icon: event.fmpPlan.icon,
            id: event.fmpPlan.id
        };
    };
    ;
    /**
     * Detecting token to add CareerFinder to basket
     */
    CareerFinderCongratulationComponent.prototype.checkForToken = function () {
        var _this = this;
        var basket = this.basketService.basket$.getValue();
        if (basket) {
            var item = basket
                .find(function (item) { return item.title === _this.careerFinderPackage.title; });
            if (!item) {
                this.basketService.addNewItem(this.careerFinderPackage);
            }
        }
    };
    /**
     * Updating selected package if type changed
     * @param event
     */
    CareerFinderCongratulationComponent.prototype.packageTypeChanged = function (event) {
        var basket = this.basketService.basket$.getValue();
        var index = -1;
        var item = basket.filter(function (element, _index) {
            if (element.title === event.title) {
                index = _index;
            }
            return element.title === event.title;
        })[0];
        if (item && index !== -1) {
            basket[index].plan = event.selectedType.title;
            basket[index].price = event.selectedType.price;
        }
    };
    CareerFinderCongratulationComponent.prototype.goToCheckout = function () {
        /**
         * Update root basket
         */
        this.basketService.updateLocalBasket();
        /**
         * Update root payment
         */
        this.paymentService.updatePayment();
        this.changeDetector.detectChanges();
        this.router.navigate(['/checkout']);
    };
    CareerFinderCongratulationComponent.prototype.careerFinderCostChanged = function (value) {
        this.careerFinderPackage.price = value;
    };
    /**
     * Detect if there are CareerFinder in basket
     * Get price from it and set to local CareerFinder
     */
    CareerFinderCongratulationComponent.prototype.checkForBasket = function () {
        if (this.basket) {
            /**
             * Searching for CareerFinder package
             * @type {IBasketItem}
             */
            var careerFinder = this.basket.find(function (item) { return item.id === 1; });
            if (careerFinder) {
                var price = (careerFinder.price / (+careerFinder.plan || 1)) || 0;
                this.careerFinderPackage.price = price;
                /**
                 * Link local package to
                 * @type {IBasketItem}
                 */
                this.basket[this.basket.indexOf(careerFinder)] = this.careerFinderPackage;
                /**
                 * Set real price to career finder range
                 * @type {number}
                 */
                var minValue = this.sliderPercent * 1000;
                this.careerFinderPrice = price || minValue;
            }
        }
    };
    CareerFinderCongratulationComponent.prototype.setLocalPackages = function (packages) {
        var _this = this;
        this.packages = packages.map(function (item) {
            var inBasket = _this.basket
                .find(function (element) { return element.title === item.name; });
            var senior = {
                title: 'Senior',
                price: item.price_senior
            };
            return {
                title: item.name,
                types: [
                    senior,
                    {
                        title: 'Executive',
                        price: item.price_executive
                    }
                ],
                icon: item.icon,
                isSelected: Boolean(inBasket),
                selectedType: Boolean(inBasket) ? { title: inBasket.plan, price: inBasket.price } : senior,
                id: item.id
            };
        });
    };
    /**
     * Method that creates subscriptions
     */
    CareerFinderCongratulationComponent.prototype.createSubscriptions = function () {
        var _this = this;
        this.userService.user$
            .takeUntil(this.destroyed$)
            .subscribe(function (user) { return _this.user = user; });
        this.basketService.basket$
            .takeUntil(this.destroyed$)
            .filter(function (items) { return Array.isArray(items); })
            .subscribe(function (items) { return _this.basket = items; });
        this.userService.isAuth$
            .takeUntil(this.destroyed$)
            .subscribe(function (state) { return _this.isAuth = state; });
    };
    CareerFinderCongratulationComponent = CareerFinderCongratulationComponent_1 = __decorate([
        Component({
            selector: 'career-finder-congratulation-component',
            templateUrl: 'career-finder-congratulation.component.html',
            styles: [require('./career-finder-congratulation.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            BasketService,
            Router,
            UserService,
            PaymentService,
            ChangeDetectorRef,
            PlatformCheckService])
    ], CareerFinderCongratulationComponent);
    return CareerFinderCongratulationComponent;
    var CareerFinderCongratulationComponent_1;
}());
export { CareerFinderCongratulationComponent };
