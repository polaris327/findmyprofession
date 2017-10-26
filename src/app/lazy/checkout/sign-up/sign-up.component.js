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
import { Observable } from 'rxjs/Observable';
import { SignUpErrors } from './sign-up.model';
import { ShowValidationErrors } from '../../../core/validators/show-validation-errors.model';
import { REGEX_EMAIL_PATTERN } from '../../../core/validators/validation-patterns.model';
import { CustomValidators } from '../../../core/validators/validators.service';
import { Subject } from 'rxjs/Subject';
var SignUpComponent = /** @class */ (function (_super) {
    __extends(SignUpComponent, _super);
    function SignUpComponent(fb, errorFormModel) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.errorFormModel = errorFormModel;
        _this.onStatusChanged = new EventEmitter();
        _this.onModelChanged = new EventEmitter();
        _this.destroyed$ = new Subject();
        _this.buildForm();
        _this.watchForFields();
        return _this;
    }
    SignUpComponent.prototype.closeError = function (field) {
        this.fm[field] = null;
    };
    SignUpComponent.prototype.ngOnChanges = function (changes) {
        var change = changes['isGlobalValidate'];
        if (change && !change.firstChange && change.currentValue) {
            this.modelForm.controls['isGlobalValidate'].setValue(true);
            _super.prototype.onValueChanged.call(this);
        }
        var getModel = changes['isGlobalValidate'];
        if (getModel && getModel.currentValue) {
            this.onModelChanged.emit(this.getCredentials());
        }
    };
    SignUpComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
        _super.prototype.clearErrors.call(this);
    };
    SignUpComponent.prototype.buildForm = function () {
        this.fm = this.errorFormModel.formErrors;
        this.modelForm = this.fb.group({
            full_name: [null, [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30)
                ]],
            email: [null, [
                    Validators.required,
                    Validators.pattern(REGEX_EMAIL_PATTERN)
                ]],
            password: [null, [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(128),
                    CustomValidators.passwordValidator
                ]],
            confirm_password: [null, [
                    Validators.required
                ]],
            isGlobalValidate: [{
                    value: false,
                    disabled: true
                }]
        });
        _super.prototype.setData.call(this, this.modelForm, this.errorFormModel);
        this.fields = Object.keys(this.modelForm.value).map(function (field) { return field; });
    };
    SignUpComponent.prototype.watchForFields = function () {
        var _this = this;
        var observers = this.fields.map(function (field) { return _this.modelForm.get(field).valueChanges; });
        Observable.merge.apply(Observable, observers).takeUntil(this.destroyed$)
            .subscribe(function () {
            _super.prototype.clearErrors.call(_this);
            _this.onModelChanged.emit(_this.getCredentials());
            _this.onStatusChanged.emit(_this.modelForm.valid);
        });
    };
    /**
     * Method to create object of credentials
     * @returns {ICredentials}
     */
    SignUpComponent.prototype.getCredentials = function () {
        return this.modelForm.value;
    };
    ;
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SignUpComponent.prototype, "getModel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SignUpComponent.prototype, "isGlobalValidate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SignUpComponent.prototype, "onStatusChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SignUpComponent.prototype, "onModelChanged", void 0);
    SignUpComponent = __decorate([
        Component({
            selector: 'fmp-sign-up-component',
            templateUrl: 'sign-up.component.html'
        }),
        __metadata("design:paramtypes", [FormBuilder,
            SignUpErrors])
    ], SignUpComponent);
    return SignUpComponent;
}(ShowValidationErrors));
export { SignUpComponent };
