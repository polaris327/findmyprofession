var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { PlatformCheckService } from '../services/platform-check.service';
var UserAuthGuard = /** @class */ (function () {
    function UserAuthGuard(router, userService, platformCheck) {
        this.router = router;
        this.userService = userService;
        this.platformCheck = platformCheck;
    }
    UserAuthGuard.prototype.canLoad = function () {
        return this.check();
    };
    UserAuthGuard.prototype.canActivate = function () {
        return this.check();
    };
    UserAuthGuard.prototype.check = function () {
        if (this.platformCheck.isBrowser) {
            var isAuth = this.userService.isAuth$.getValue();
            if (isAuth) {
                this.router.navigate(['/home']);
            }
            return Observable.of(!isAuth);
        }
        return Observable.of(true);
    };
    UserAuthGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router,
            UserService,
            PlatformCheckService])
    ], UserAuthGuard);
    return UserAuthGuard;
}());
export { UserAuthGuard };
