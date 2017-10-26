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
var HomeCarouselComponent = /** @class */ (function () {
    function HomeCarouselComponent() {
        this.defaultAvatar = require('../../../../assets/images/logo-icon.png');
        this.defaultImage = this.defaultAvatar;
        this.isAvatarLoaded = false;
    }
    HomeCarouselComponent.prototype.ngOnChanges = function (changes) {
        var index = changes['currentShowIndex'];
        if (index && index.currentValue) {
            var numIndex = Math.abs(+index.currentValue);
            if (numIndex === this.item.index) {
                this.isAvatarLoaded = true;
            }
        }
    };
    HomeCarouselComponent.prototype.authorAvatarNotLoaded = function (event) {
        if (event.target) {
            event.target.src = this.defaultAvatar;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HomeCarouselComponent.prototype, "item", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HomeCarouselComponent.prototype, "defaultImage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], HomeCarouselComponent.prototype, "currentShowIndex", void 0);
    HomeCarouselComponent = __decorate([
        Component({
            selector: 'fmp-home-carousel-component',
            templateUrl: 'home-carousel.component.html',
            styles: [require('./home-carousel.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], HomeCarouselComponent);
    return HomeCarouselComponent;
}());
export { HomeCarouselComponent };
