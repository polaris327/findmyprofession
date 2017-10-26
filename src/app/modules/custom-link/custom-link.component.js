var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
var CustomLinkComponent = /** @class */ (function () {
    function CustomLinkComponent(router) {
        this.router = router;
    }
    CustomLinkComponent.prototype.linkTaped = function (tapEvent) {
        tapEvent.preventDefault();
        this.openLink();
    };
    CustomLinkComponent.prototype.linkMove = function (moveEvent) {
        moveEvent.preventDefault();
    };
    CustomLinkComponent.prototype.linkClicked = function (clickEvent) {
        clickEvent.preventDefault();
        this.openLink();
    };
    CustomLinkComponent.prototype.openLink = function () {
        this.router.navigate(this.linkArray);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CustomLinkComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CustomLinkComponent.prototype, "linkArray", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CustomLinkComponent.prototype, "linkClass", void 0);
    CustomLinkComponent = __decorate([
        Component({
            selector: 'fmp-custom-link',
            templateUrl: 'custom-link.html'
        }),
        __metadata("design:paramtypes", [Router])
    ], CustomLinkComponent);
    return CustomLinkComponent;
}());
export { CustomLinkComponent };
