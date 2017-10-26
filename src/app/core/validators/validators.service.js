var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    CustomValidators_1 = CustomValidators;
    CustomValidators.passwordValidator = function (control) {
        if (control.value) {
            if (!CustomValidators_1.regex.test(control.value.toString())) {
                return {
                    passwordShouldContainSymbol: true
                };
            }
        }
        return null;
    };
    CustomValidators.confirmationPasswordValidator = function (controlA, controlB) {
        if (controlA.value && controlB.value) {
            if (controlA.value.toString() !== controlB.value.toString()) {
                return {
                    passwordsNotMatch: true
                };
            }
        }
        return null;
    };
    // private static regex: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*,.])[a-zA-Z0-9!@#$%^&*,.]/;
    CustomValidators.regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    CustomValidators = CustomValidators_1 = __decorate([
        Injectable()
    ], CustomValidators);
    return CustomValidators;
    var CustomValidators_1;
}());
export { CustomValidators };
