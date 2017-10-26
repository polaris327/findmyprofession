var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
var LikeIconComponent = /** @class */ (function () {
    function LikeIconComponent() {
        this.onToggle = new EventEmitter();
    }
    LikeIconComponent.prototype.toggleLike = function ($event) {
        $event.stopPropagation();
        this.onToggle.emit(!this.isLiked);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LikeIconComponent.prototype, "isLiked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LikeIconComponent.prototype, "isArticle", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], LikeIconComponent.prototype, "onToggle", void 0);
    LikeIconComponent = __decorate([
        Component({
            selector: 'fmp-like-icon-component',
            templateUrl: 'like-icon.html',
            styles: [require('./like-icon.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], LikeIconComponent);
    return LikeIconComponent;
}());
export { LikeIconComponent };
