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
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { REGEX_EMAIL_PATTERN } from '../../core/validators/validation-patterns.model';
import { ShowValidationErrors } from '../../core/validators/show-validation-errors.model';
import { SignInErrors } from './signin.model';
import { SignInService } from './signin.service';
import { UserService } from '../../core/services/user.service';
import { MetaTags } from '../../core/services/meta-tags.service';
import { CoreUtilitiesService } from '../../core/services/core-utilities.service';
var SignInComponent = /** @class */ (function (_super) {
    __extends(SignInComponent, _super);
    function SignInComponent(fb, errorFormModel, signInService, userService, router, metaService) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.errorFormModel = errorFormModel;
        _this.signInService = signInService;
        _this.userService = userService;
        _this.router = router;
        _this.metaService = metaService;
        /**
         * State of current request
         * @type {boolean}
         */
        _this.isRequestSending = false;
        _this.isComponentInited = false;
        _this.setMetaTags();
        _this.buildModelForm();
        return _this;
    }
    SignInComponent.prototype.ngOnDestroy = function () {
        this.resetComponent();
    };
    SignInComponent.prototype.ngOnInit = function () {
        this.isComponentInited = true;
    };
    /**
     * Method to send form
     */
    SignInComponent.prototype.sendForm = function () {
        var _this = this;
        this.errorMessage = '';
        /*Setting global form validation*/
        this.setGlobal();
        _super.prototype.onValueChanged.call(this);
        if (this.modelForm.invalid) {
            return;
        }
        this.isRequestSending = true;
        this.signInService.signInUser(this.getSignInData(this.modelForm.value))
            .finally(function () { return _this.isRequestSending = false; })
            .subscribe(function (response) { return _this.signInHandler(response); }, function (errorObject) { return _this.errorMessage = errorObject.message; });
    };
    /**
     * Method to close error
     * @param field
     */
    SignInComponent.prototype.closeError = function (field) {
        this.fm[field] ? this.fm[field] = '' : this.errorMessage = '';
    };
    /**
     * Method to handle sign in method
     * @param response
     */
    SignInComponent.prototype.signInHandler = function (response) {
        var _this = this;
        this.userService.signIn(response, this.modelForm.value.rememberUser);
        Observable.fromPromise(this.router.navigate(['/home']))
            .filter(function (state) { return state; })
            .subscribe(function () { return _this.resetComponent(); });
    };
    /**
     * Method to build model form
     */
    SignInComponent.prototype.buildModelForm = function () {
        var _this = this;
        this.fm = this.errorFormModel.formErrors;
        this.modelForm = this.fb.group({
            email: [null, [
                    Validators.required,
                    Validators.pattern(REGEX_EMAIL_PATTERN)
                ]],
            password: [null, [
                    Validators.required
                ]],
            rememberUser: [false],
            isGlobalValidate: [false]
        });
        _super.prototype.setData.call(this, this.modelForm, this.errorFormModel);
        Observable.merge(this.modelForm.get('email').valueChanges, this.modelForm.get('password').valueChanges).subscribe(function () {
            _this.setGlobal();
            _super.prototype.clearErrors.call(_this);
        });
    };
    /**
     * Create object with data to send on server
     * @param modelForm
     * @returns {{email, password}}
     */
    SignInComponent.prototype.getSignInData = function (modelForm) {
        return {
            email: modelForm.email,
            password: modelForm.password,
            timezone: CoreUtilitiesService.getTimeZone()
        };
    };
    SignInComponent.prototype.resetComponent = function () {
        this.modelForm.reset();
        this.errorMessage = '';
        _super.prototype.clearErrors.call(this);
    };
    SignInComponent.prototype.setGlobal = function (value) {
        if (value === void 0) { value = true; }
        this.modelForm.get('isGlobalValidate').setValue(value);
    };
    SignInComponent.prototype.setMetaTags = function () {
        var title = 'Login - Find My Profession';
        this.metaService.setTitle(title);
        this.metaService.setTitles(title);
        this.metaService.setDescription('Please log in to Find My Profession. Take the next step in your career with our career finder service and get hired with the minimal amount of effort.');
        this.metaService.removeImageTags();
    };
    SignInComponent = __decorate([
        Component({
            selector: 'fmp-signin-component',
            templateUrl: 'signin.component.html',
            styles: [require('./signin.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [FormBuilder,
            SignInErrors,
            SignInService,
            UserService,
            Router,
            MetaTags])
    ], SignInComponent);
    return SignInComponent;
}(ShowValidationErrors));
export { SignInComponent };
