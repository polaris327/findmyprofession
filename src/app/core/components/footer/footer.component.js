var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs/Subject';
var FooterComponent = /** @class */ (function () {
    function FooterComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.isAuth = false;
        this.destroyed$ = new Subject();
        this.createAuthSub();
    }
    FooterComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    FooterComponent.prototype.openCareerAdvice = function (event) {
        event.preventDefault();
        this.router.navigate(['/career-advice']);
    };
    FooterComponent.prototype.createAuthSub = function () {
        var _this = this;
        this.userService.isAuth$
            .takeUntil(this.destroyed$)
            .subscribe(function (state) { return _this.isAuth = state; });
    };
    FooterComponent = __decorate([
        Component({
            selector: 'fmp-footer-component',
            templateUrl: 'footer.component.html',
            styles: [require('./footer.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [UserService,
            Router])
    ], FooterComponent);
    return FooterComponent;
}());
export { FooterComponent };
