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
import { StoreService } from './store.service';
var BasketService = /** @class */ (function () {
    function BasketService(storeService) {
        this.storeService = storeService;
        this.storeBasketToken = '_busket_';
        this.basket$ = new BehaviorSubject(this.getLocalBasket());
    }
    /**
     * Clear all basket
     */
    BasketService.prototype.clearOut = function () {
        if (this.basket$) {
            this.basket$.next([]);
        }
    };
    /**
     * Add new item to basket stream
     * @param item
     */
    BasketService.prototype.addNewItem = function (item) {
        if (this.basket$) {
            var basket = this.basket$.getValue().slice();
            if (Array.isArray(basket)) {
                var contain = basket.filter(function (element) {
                    return element.title === item.title;
                })[0];
                if (contain) {
                    contain.price = item.price;
                    contain.plan = item.plan;
                }
                else {
                    basket.push(item);
                    this.basket$.next(basket);
                }
                this.updateLocalBasket();
            }
        }
    };
    /**
     * Remove item from basket stream
     * @param index
     */
    BasketService.prototype.removeItemByIndex = function (index) {
        if (index === void 0) { index = 0; }
        if (this.basket$) {
            var basket = this.basket$.getValue().slice();
            if (Array.isArray(basket) && basket.length > index) {
                basket.splice(index, 1);
                this.basket$.next(basket);
                this.updateLocalBasket();
            }
        }
    };
    BasketService.prototype.removeItem = function (item) {
        if (item) {
            var basket = this.basket$.getValue().slice();
            var index = basket.indexOf(item);
            if (index !== -1) {
                basket.splice(index, 1);
                this.basket$.next(basket);
                this.updateLocalBasket();
            }
        }
    };
    /**
     * Check if current basket state is empty
     * @returns {boolean}
     */
    BasketService.prototype.isEmpty = function () {
        return this.basket$ ? this.basket$.getValue() === [] : false;
    };
    /**
     * Method to clear basket , remove all items
     */
    BasketService.prototype.clearBasket = function () {
        this.basket$.next([]);
        this.updateLocalBasket();
    };
    BasketService.prototype.updateLocalBasket = function () {
        this.storeService.setItem(this.storeBasketToken, this.basket$.getValue());
    };
    BasketService.prototype.convertToDescription = function () {
        var basket = this.basket$.getValue();
        if (Array.isArray(basket)) {
            return basket.map(function (item) {
                return "Service: " + item.title + ". Plan: " + item.plan + ". Price: $" + item.price;
            }).join(';');
        }
    };
    BasketService.prototype.getLocalBasket = function () {
        return this.storeService.getItem(this.storeBasketToken) || [];
    };
    BasketService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [StoreService])
    ], BasketService);
    return BasketService;
}());
export { BasketService };
