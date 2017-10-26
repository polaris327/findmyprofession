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
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShowValidationErrors } from '../../core/validators/show-validation-errors.model';
import { ResetPasswordErrors } from './password-reset.model';
import { ActivatedRoute, Router } from '@angular/router';
import { REGEX_EMAIL_PATTERN } from '../../core/validators/validation-patterns.model';
import { PasswordResetService } from './password-reset.service';
import { CustomValidators } from '../../core/validators/validators.service';
import { Title } from '@angular/platform-browser';
import { MetaTags } from '../../core/services/meta-tags.service';
var PasswordResetComponent = /** @class */ (function (_super) {
    __extends(PasswordResetComponent, _super);
    function PasswordResetComponent(fb, errorFormModel, route, passwordResetService, router, titleService, metaTags) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.errorFormModel = errorFormModel;
        _this.route = route;
        _this.passwordResetService = passwordResetService;
        _this.router = router;
        _this.titleService = titleService;
        _this.metaTags = metaTags;
        /**
         * Detect if current mode is RESET
         * @type {boolean}
         */
        _this.isResetMode = false;
        _this.isSent = false;
        /**
         * Default server error message
         * @type {string}
         */
        _this.defaultError = 'Server error.';
        _this.titleService.setTitle('Password Reset - Find My Profession');
        _this.metaTags.removeAllMetaTags();
        _this.fm = _this.errorFormModel.formErrors;
        /**
         * Detect if there is any token
         */
        _this.route.queryParams
            .subscribe(function (params) {
            _this.isResetMode = !!(params && params.t);
            if (_this.isResetMode) {
                _this.resetToken = params.t;
                _this.resetModelForm = _this.fb.group({
                    'password': [null, [
                            Validators.required,
                            Validators.minLength(8),
                            Validators.maxLength(128),
                            CustomValidators.passwordValidator
                        ]],
                    'confirm_password': [null, [
                            Validators.required
                        ]],
                    'isGlobalValidate': [false]
                });
                _super.prototype.setData.call(_this, _this.resetModelForm, _this.errorFormModel);
                _this.resetModelForm.valueChanges
                    .subscribe(function () { return _super.prototype.onValueChanged.call(_this); });
            }
            else {
                _this.modelForm = _this.fb.group({
                    'email': [null, [
                            Validators.required,
                            Validators.pattern(REGEX_EMAIL_PATTERN)
                        ]],
                    'isGlobalValidate': [false]
                });
                _super.prototype.setData.call(_this, _this.modelForm, _this.errorFormModel);
                _this.modelForm.valueChanges
                    .subscribe(function () { return _super.prototype.onValueChanged.call(_this); });
            }
        });
        return _this;
    }
    PasswordResetComponent.prototype.sendEmail = function () {
        var _this = this;
        if (!this.modelForm) {
            return;
        }
        this.modelForm.controls['isGlobalValidate'].setValue(true);
        this.errorMessage = '';
        if (this.modelForm.invalid) {
            return;
        }
        this.isRequestSending = true;
        this.passwordResetService.sendEmail(this.modelForm.value.email)
            .finally(function () { return _this.isRequestSending = false; })
            .subscribe(function () {
            _this.sentEmail = _this.modelForm.value.email;
            _this.modelForm.reset();
            _this.isSent = true;
        }, this.handleError.bind(this));
    };
    /**
     * Method to reset password
     */
    PasswordResetComponent.prototype.resetPassword = function () {
        var _this = this;
        if (!this.resetModelForm) {
            return;
        }
        this.resetModelForm.controls['isGlobalValidate'].setValue(true);
        this.errorMessage = '';
        var errors = CustomValidators.confirmationPasswordValidator(this.resetModelForm.controls['password'], this.resetModelForm.controls['confirm_password']);
        if (errors) {
            this.resetModelForm.controls['confirm_password'].setErrors(errors);
        }
        _super.prototype.onValueChanged.call(this);
        if (this.resetModelForm.invalid) {
            return;
        }
        var value = this.resetModelForm.value;
        var request = {
            password: value.password,
            confirm_password: value.confirm_password,
            token: this.resetToken
        };
        this.isRequestSending = true;
        this.passwordResetService.resetPassword(request)
            .finally(function () { return _this.isRequestSending = false; })
            .subscribe(function () {
            _this.resetModelForm.reset();
            _this.router.navigate(['/login']);
        }, this.handleError.bind(this));
    };
    PasswordResetComponent.prototype.closeError = function (field) {
        if (field === 'main') {
            this.errorMessage = '';
        }
        else {
            this.fm[field] = '';
        }
    };
    PasswordResetComponent.prototype.handleError = function (error) {
        this.errorMessage = error.message || this.defaultError;
    };
    PasswordResetComponent = __decorate([
        Component({
            selector: 'fmp-password-reset-component',
            templateUrl: 'password-reset.component.html',
            styles: [require('./password-reset.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ResetPasswordErrors,
            ActivatedRoute,
            PasswordResetService,
            Router,
            Title,
            MetaTags])
    ], PasswordResetComponent);
    return PasswordResetComponent;
}(ShowValidationErrors));
export { PasswordResetComponent };
