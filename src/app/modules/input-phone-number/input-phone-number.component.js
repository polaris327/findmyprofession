var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
var InputPhoneNumberComponent = /** @class */ (function () {
    function InputPhoneNumberComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.onNumberInput = new EventEmitter();
        /***
         * Options for number mask
         * */
        this.phoneNumberConfig = {
            mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            guide: false,
            keepCharPositions: true
        };
    }
    InputPhoneNumberComponent_1 = InputPhoneNumberComponent;
    InputPhoneNumberComponent.prototype.ngOnChanges = function (changes) {
        var focusTime = changes['focusTime'];
        if (focusTime && focusTime.currentValue) {
            if (this.phoneNumber) {
                this.phoneNumber.nativeElement.focus();
                this.changeDetector.detectChanges();
            }
        }
    };
    InputPhoneNumberComponent.prototype.ngOnDestroy = function () {
        this.changeDetector.detach();
    };
    InputPhoneNumberComponent.prototype.fieldInput = function (value) {
        this.onNumberInput.emit(InputPhoneNumberComponent_1.parseValue(value));
    };
    /**
     * Method to parse value to string with numbers
     * @param value
     * @returns {string}
     */
    InputPhoneNumberComponent.parseValue = function (value) {
        return value ? value.toString().replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/ /g, '') : value;
    };
    __decorate([
        ViewChild('phoneNumber'),
        __metadata("design:type", Object)
    ], InputPhoneNumberComponent.prototype, "phoneNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputPhoneNumberComponent.prototype, "focusTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputPhoneNumberComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputPhoneNumberComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InputPhoneNumberComponent.prototype, "fieldClass", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], InputPhoneNumberComponent.prototype, "onNumberInput", void 0);
    InputPhoneNumberComponent = InputPhoneNumberComponent_1 = __decorate([
        Component({
            selector: 'fmp-input-phone-number-component',
            templateUrl: 'input-phone-number.html'
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], InputPhoneNumberComponent);
    return InputPhoneNumberComponent;
    var InputPhoneNumberComponent_1;
}());
export { InputPhoneNumberComponent };
