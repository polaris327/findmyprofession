var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
var CustomDropdownComponent = /** @class */ (function () {
    function CustomDropdownComponent() {
        this.type = 'common';
        this.isDisabled = false;
        this.valueSelected = new EventEmitter();
    }
    CustomDropdownComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        /**
         * Detect if need to open dropwdown
         */
        var openChanges = changes['openTime'];
        if (openChanges && openChanges.currentValue) {
            /**
             * manually creating async action
             */
            setTimeout(function () {
                _this.dropdown.open();
            });
        }
    };
    CustomDropdownComponent.prototype.selectValue = function (value) {
        var _this = this;
        if (this.type === 'jobs') {
            var oldValue_1 = this.selectedValue ? this.selectedValue.toString() : '';
            var change = {
                currentValue: value,
                previousValue: oldValue_1,
                callback: function () {
                    setTimeout(function () {
                        _this.selectedValue = oldValue_1;
                    });
                }
            };
            this.valueSelected.emit(change);
        }
        else {
            this.valueSelected.emit(value);
        }
        this.selectedValue = value;
    };
    __decorate([
        ViewChild('dropdown'),
        __metadata("design:type", NgbDropdown)
    ], CustomDropdownComponent.prototype, "dropdown", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CustomDropdownComponent.prototype, "openTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CustomDropdownComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CustomDropdownComponent.prototype, "values", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CustomDropdownComponent.prototype, "selectedValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CustomDropdownComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CustomDropdownComponent.prototype, "isDisabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CustomDropdownComponent.prototype, "valueSelected", void 0);
    CustomDropdownComponent = __decorate([
        Component({
            selector: 'fmp-custom-dropdown-component',
            templateUrl: 'custom-dropdown.html',
            styles: [require('./custom-dropdown.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], CustomDropdownComponent);
    return CustomDropdownComponent;
}());
export { CustomDropdownComponent };
