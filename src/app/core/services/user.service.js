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
import { BehaviorSubject } from 'rxjs';
import { StoreService } from './store.service';
import { Router } from '@angular/router';
var UserService = /** @class */ (function () {
    function UserService(storeService, router) {
        this.storeService = storeService;
        this.router = router;
        /**
         * Store user token
         * @type {string}
         * @private
         */
        this._user_key = '__user';
        /**
         * Getting user from store is exist
         * @type {IUser|null}
         */
        var user = this.getUser();
        this.user$ = new BehaviorSubject(user);
        this.isAuth$ = new BehaviorSubject(!!user);
    }
    /**
     * *************************************** Public methods ******************************************
     */
    /**
     * Method to log out user from service
     */
    UserService.prototype.logOut = function () {
        this.isAuth$.next(false);
        this.user$.next(null);
        this.clearUserInfo();
        this.router.navigate(['/']);
    };
    /**
     * Method to login user to system
     * @param user
     * @param isRemember
     */
    UserService.prototype.signIn = function (user, isRemember) {
        if (user) {
            this.isAuth$.next(true);
            this.saveUser(user, isRemember);
        }
    };
    /**
     * Method to Sign Up User
     * @param user
     * @param isRemember
     */
    UserService.prototype.signUpUser = function (user, isRemember) {
        if (user) {
            this.isAuth$.next(true);
            this.saveUser(user, isRemember);
        }
    };
    UserService.prototype.checkIfCareerFinderBought = function () {
        var user = this.user$.getValue();
        if (user) {
            return user.packages
                .filter(function (userPackage) { return !!userPackage.service; })
                .some(function (userPackage) { return userPackage.service.id === 1; });
        }
        return false;
    };
    /**
     * ********************************* Private methods ********************************************
     */
    /**
     * Method to update User in store
     * @param user
     * @param isRemember
     */
    UserService.prototype.saveUser = function (user, isRemember) {
        if (user) {
            this.user$.next(user);
            this.storeService.setItem(this._user_key, user, isRemember);
        }
    };
    /**
     * Method to remove user from our store
     */
    UserService.prototype.clearUserInfo = function () {
        this.storeService.removeItem(this._user_key);
    };
    UserService.prototype.getUser = function () {
        return this.storeService.getItem(this._user_key) || null;
    };
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [StoreService,
            Router])
    ], UserService);
    return UserService;
}());
export { UserService };
