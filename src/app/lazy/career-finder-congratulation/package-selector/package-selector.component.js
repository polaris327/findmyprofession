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
var PackageSelectorComponent = /** @class */ (function () {
    function PackageSelectorComponent() {
        this.isSelected = false;
        this.onPackageSelect = new EventEmitter();
        this.onPackageTypeChanged = new EventEmitter();
    }
    PackageSelectorComponent.prototype.radioButtonChanged = function () {
        this.onPackageSelect.emit({
            isSelected: this.isSelected,
            fmpPlan: this.fmpPlan
        });
    };
    PackageSelectorComponent.prototype.valueSelected = function (type) {
        this.fmpPlan.selectedType = type;
        if (this.isSelected) {
            this.onPackageTypeChanged.emit(this.fmpPlan);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PackageSelectorComponent.prototype, "fmpPlan", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PackageSelectorComponent.prototype, "isSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PackageSelectorComponent.prototype, "onPackageSelect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PackageSelectorComponent.prototype, "onPackageTypeChanged", void 0);
    PackageSelectorComponent = __decorate([
        Component({
            selector: 'fmp-package-selector-component',
            templateUrl: 'package-selector.component.html',
            styles: [require('./package-selector.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], PackageSelectorComponent);
    return PackageSelectorComponent;
}());
export { PackageSelectorComponent };
