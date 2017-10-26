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
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs/Subject';
require('../../../../assets/images/logo-blue.png');
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, userService) {
        var _this = this;
        this.router = router;
        this.userService = userService;
        this.isAppLoading = true;
        this.isScrolled = false;
        this.scrolledStop = false;
        this.isHome = false;
        this.transition = false;
        this.menuState = false;
        this.dropdownState = false;
        this.isHeaderAlive = true;
        this.destroyed$ = new Subject();
        this.userService.isAuth$
            .takeUntil(this.destroyed$)
            .subscribe(function (state) { return _this.isUserAuth = state; });
        this.userService.user$
            .takeUntil(this.destroyed$)
            .subscribe(function (user) { return _this.user = user; });
        this.router.events
            .takeUntil(this.destroyed$)
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) { return _this.isHome = event.urlAfterRedirects === '/'; });
    }
    HeaderComponent.prototype.ngOnChanges = function () {
        this.menuState = false;
    };
    HeaderComponent.prototype.toggleMenu = function (event) {
        if (event) {
            event.stopPropagation();
        }
        this.menuState = !this.menuState;
    };
    HeaderComponent.prototype.closeMenu = function (event) {
        event.stopPropagation();
        this.menuState = false;
    };
    HeaderComponent.prototype.openDropDown = function (openDropDown) {
        if (openDropDown) {
            openDropDown.open();
        }
    };
    HeaderComponent.prototype.closeDropDown = function (openDropDown) {
        if (openDropDown) {
            openDropDown.close();
        }
    };
    HeaderComponent.prototype.toggleDropdown = function () {
        this.dropdownState = !this.dropdownState;
    };
    HeaderComponent.prototype.logOut = function () {
        this.userService.logOut();
    };
    HeaderComponent.prototype.openHome = function () {
        this.menuState = false;
        if (this.isUserAuth) {
            this.router.navigate(['/home']);
        }
        else {
            this.router.navigate(['/']);
        }
    };
    /**
     * There are page where no header (Checkout page)
     */
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.isHeaderAlive = false;
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeaderComponent.prototype, "isAppLoading", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeaderComponent.prototype, "isScrolled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeaderComponent.prototype, "scrolledStop", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeaderComponent.prototype, "isHomeUrl", void 0);
    HeaderComponent = __decorate([
        Component({
            selector: 'fmp-header-component',
            templateUrl: 'header.component.html',
            styles: [require('./styles/header.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [Router,
            UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
