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
var ProfileTabSettingsComponent = /** @class */ (function () {
    function ProfileTabSettingsComponent() {
        this.isCloseShow = true;
        this.isEditShow = true;
        this.onClose = new EventEmitter();
        this.onEdit = new EventEmitter();
    }
    ProfileTabSettingsComponent.prototype.onCloseClick = function () {
        this.onClose.emit();
    };
    ProfileTabSettingsComponent.prototype.onEditClick = function () {
        this.onEdit.emit();
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ProfileTabSettingsComponent.prototype, "isCloseShow", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ProfileTabSettingsComponent.prototype, "isEditShow", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ProfileTabSettingsComponent.prototype, "onClose", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ProfileTabSettingsComponent.prototype, "onEdit", void 0);
    ProfileTabSettingsComponent = __decorate([
        Component({
            selector: 'fmp-profile-tab-settings-component',
            templateUrl: 'profile-tab-settings.html',
            styles: [require('./profile-tab-settings.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], ProfileTabSettingsComponent);
    return ProfileTabSettingsComponent;
}());
export { ProfileTabSettingsComponent };
