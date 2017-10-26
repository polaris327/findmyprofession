var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { REGEX_EMAIL_PATTERN } from '../../../core/validators/validation-patterns.model';
import { ShowValidationErrors } from '../../../core/validators/show-validation-errors.model';
import { CheckoutSignInErrors } from './checkout-sign-in.model';
import { UserService } from '../../../core/services/user.service';
var CheckoutSignInComponent = /** @class */ (function (_super) {
    __extends(CheckoutSignInComponent, _super);
    function CheckoutSignInComponent(fb, modelFormErrors, userService) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.modelFormErrors = modelFormErrors;
        _this.userService = userService;
        _this.isGlobalValidate = false;
        _this.onModelStateChanged = new EventEmitter();
        _this.onModelChanged = new EventEmitter();
        var user = _this.userService.user$.getValue();
        _this.createForm(user);
        _this.fm = _this.modelFormErrors.formErrors;
        _super.prototype.setData.call(_this, _this.signInFormGroup, _this.modelFormErrors);
        _this.modelForm.get('email').valueChanges
            .merge(_this.modelForm.get('password').valueChanges)
            .subscribe(function () {
            _this.setGlobal(false);
            _this.onModelChanged.emit(CheckoutSignInComponent_1.createCredentials(_this.modelForm.value));
            _super.prototype.onValueChanged.call(_this);
        });
        _this.modelForm.statusChanges
            .subscribe(function (value) {
            var state = false;
            if (value === 'VALID') {
                state = true;
            }
            _this.onModelStateChanged.emit(state);
        });
        return _this;
    }
    CheckoutSignInComponent_1 = CheckoutSignInComponent;
    CheckoutSignInComponent.prototype.closeError = function (field) {
        this.fm[field] = null;
    };
    CheckoutSignInComponent.prototype.ngOnChanges = function () {
        this.setGlobal(this.isGlobalValidate);
        _super.prototype.onValueChanged.call(this);
    };
    CheckoutSignInComponent.prototype.createForm = function (user) {
        this.signInFormGroup = this.fb.group({
            email: [user ? user.email : null, [
                    Validators.required,
                    Validators.pattern(REGEX_EMAIL_PATTERN)
                ]],
            password: [null, [
                    Validators.required
                ]],
            isGlobalValidate: [this.isGlobalValidate]
        });
    };
    CheckoutSignInComponent.prototype.setGlobal = function (value) {
        this.modelForm.controls['isGlobalValidate'].setValue(value);
    };
    CheckoutSignInComponent.createCredentials = function (model) {
        return {
            email: model.email,
            password: model.password
        };
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CheckoutSignInComponent.prototype, "isGlobalValidate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckoutSignInComponent.prototype, "onModelStateChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckoutSignInComponent.prototype, "onModelChanged", void 0);
    CheckoutSignInComponent = CheckoutSignInComponent_1 = __decorate([
        Component({
            selector: 'fmp-checkout-sign-in-component',
            templateUrl: 'checkout-sign-in.html'
        }),
        __metadata("design:paramtypes", [FormBuilder,
            CheckoutSignInErrors,
            UserService])
    ], CheckoutSignInComponent);
    return CheckoutSignInComponent;
    var CheckoutSignInComponent_1;
}(ShowValidationErrors));
export { CheckoutSignInComponent };
