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
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShowValidationErrors } from '../../../../../core/validators/show-validation-errors.model';
import { AccordionTabProfileErrors, COMPONENT_RESTRICTIONS, FIELD_SETTINGS } from './accordion-tab-profile.model';
import { REGEX_LINKED_IN, REGEX_ZIP_PATTERN } from '../../../../../core/validators/validation-patterns.model';
import { ProfileAccordionService } from '../../profile-accordion.service';
import { UserProfileService } from '../../user-profile.service';
import { ProfileUtilities } from '../../profile-utilities.service';
import { PlatformCheckService } from '../../../../../core/services/platform-check.service';
import { Subject } from 'rxjs/Subject';
var AccordionTabProfileComponent = /** @class */ (function (_super) {
    __extends(AccordionTabProfileComponent, _super);
    function AccordionTabProfileComponent(fb, formErrorsModel, changeDetector, accordionService, profileService, platformCheckService) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.formErrorsModel = formErrorsModel;
        _this.changeDetector = changeDetector;
        _this.accordionService = accordionService;
        _this.profileService = profileService;
        _this.platformCheckService = platformCheckService;
        _this.onAccordionClose = new EventEmitter();
        _this.isRequestSending = false;
        _this.componentInited = false;
        _this.destroyed$ = new Subject();
        /**
         * Fields that need to send to server
         * @type {[string,string,string,string,string,string,string,string]}
         */
        _this.fields = [
            'birth_date',
            'city',
            'full_name',
            'linkedin_url',
            'phone_number',
            'state',
            'street_address',
            'postal_code',
        ];
        _this.dataCopy = {};
        _this.defaultDate = new Date();
        _this.componentRestrictions = COMPONENT_RESTRICTIONS;
        _this.fieldsSettings = FIELD_SETTINGS;
        _this.accordionSubscriptions();
        _this.setPeriodsDate();
        return _this;
    }
    AccordionTabProfileComponent.prototype.ngOnInit = function () {
        if (this.platformCheckService.isBrowser) {
            this.componentInited = true;
        }
    };
    AccordionTabProfileComponent.prototype.ngOnChanges = function () {
        if (this.profile) {
            this.createModelForm();
        }
    };
    AccordionTabProfileComponent.prototype.ngOnDestroy = function () {
        this.checkIfDataUpdated();
        this.destroyed$.next();
        this.destroyed$.complete();
        this.changeDetector.detach();
    };
    AccordionTabProfileComponent.prototype.toggleDatePicker = function (event) {
        this.birthDateCalendar.showOverlay(this.birthDateCalendar.inputfieldViewChild.nativeElement);
        event.stopPropagation();
    };
    /**
     * Method to set PhoneNumber value
     * @param value
     */
    AccordionTabProfileComponent.prototype.onPhoneNumberInput = function (value) {
        this.modelForm.controls['phone_number'].setValue(value);
    };
    /**
     * Method to set value to specific field
     * @param field
     * @param value
     */
    AccordionTabProfileComponent.prototype.setFieldValue = function (field, value) {
        if (field === 'street_address') {
            if (value && value.formatted_address) {
                value = value.formatted_address;
            }
        }
        this.modelForm.controls[field].setValue(value);
        this.changeDetector.detectChanges();
    };
    AccordionTabProfileComponent.prototype.setPeriodsDate = function (offset) {
        if (offset === void 0) { offset = 16; }
        var currentDate = new Date();
        var maxYear = (currentDate.getFullYear() - offset);
        var minYear = maxYear - 90;
        this.birthDateYearsRange = minYear + ":" + maxYear;
    };
    /**
     * Send form to server
     * */
    AccordionTabProfileComponent.prototype.saveForm = function (calback) {
        var _this = this;
        if (!this.modelForm) {
            return;
        }
        this.validateForm();
        if (this.modelForm.invalid) {
            _super.prototype.onValueChanged.call(this);
            return;
        }
        this.modelForm.value.birth_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.birth_date);
        var data = ProfileUtilities.parseModel(this.modelForm.value, this.fields);
        this.profileService.updateProfileForm(data)
            .do(function () { return _this.isRequestSending = true; })
            .finally(function () { return _this.isRequestSending = false; })
            .subscribe(function (response) {
            _this.dataCopy = data;
            _this.updateProfile(response);
            /**
             * Trigger callback
             */
            calback && calback();
        }, function (error) { return _this.errorMessage = error.message; });
    };
    AccordionTabProfileComponent.prototype.validateForm = function () {
        this.modelForm.get('isGlobalValidate').setValue(true);
    };
    AccordionTabProfileComponent.prototype.closeError = function (field) {
        this.fm[field] = '';
    };
    /**
     *  Method to Compare two Objects
     * @param model
     * @param copy
     * @returns {boolean}
     */
    AccordionTabProfileComponent.prototype.compareModels = function (model, copy) {
        return this.fields.some(function (field) {
            return model[field] !== copy[field];
        });
    };
    /**
     * Method to subscribe to accordion service
     */
    AccordionTabProfileComponent.prototype.accordionSubscriptions = function () {
        var _this = this;
        this.accordionService.accordionState$
            .takeUntil(this.destroyed$)
            .filter(function (state) { return state && state.event && !state.event.nextState; })
            .distinctUntilChanged(null, function (state) { return state.event.nextState; })
            .subscribe(function (state) { return _this.onComponentClose(state); });
    };
    AccordionTabProfileComponent.prototype.onComponentClose = function (state) {
        var _this = this;
        if (this.modelForm.invalid) {
            state.event.preventDefault();
            this.validateForm();
            _super.prototype.onValueChanged.call(this);
        }
        var callbackBefore = function () {
            state.event.preventDefault();
        };
        var callbackAfter = function () {
            state.accordion.toggle(_this.accordionId);
        };
        this.checkIfDataUpdated(callbackBefore, callbackAfter);
    };
    /**
     * method to create form
     */
    AccordionTabProfileComponent.prototype.createModelForm = function () {
        var _this = this;
        if (!this.modelForm && this.profile) {
            this.buildForm();
        }
        if (this.modelForm) {
            _super.prototype.setData.call(this, this.modelForm, this.formErrorsModel);
            this.fm = this.formErrorsModel.formErrors;
            this.modelForm.valueChanges
                .subscribe(function () { return _super.prototype.onValueChanged.call(_this); });
            this.changeDetector.detectChanges();
        }
    };
    /**
     * Method to build FormGroup
     */
    AccordionTabProfileComponent.prototype.buildForm = function () {
        this.modelForm = this.fb.group({
            full_name: [this.profile ? this.profile.full_name : '', [
                    Validators.required
                ]],
            email: [{
                    value: this.profile ? this.profile.email : '',
                    disabled: true /*Disabling */
                }],
            phone_number: [this.profile ? this.profile.phone_number : ''],
            street_address: [this.profile ? this.profile.street_address : ''],
            city: [this.profile ? this.profile.city : ''],
            state: [this.profile ? this.profile.state : ''],
            postal_code: [this.profile ? this.profile.postal_code : '', [
                    Validators.pattern(REGEX_ZIP_PATTERN)
                ]],
            birth_date: [this.profile ? this.getDate(this.profile.birth_date ? this.profile.birth_date.toString() : null) : null],
            birthDate: [null],
            linkedin_url: [this.profile ? this.profile.linkedin_url : '', [
                    Validators.pattern(REGEX_LINKED_IN)
                ]],
            isGlobalValidate: [false]
        });
        if (!this.profile.birth_date) {
            this.setPeriodsDate(0);
        }
        this.dataCopy = ProfileUtilities.parseModel(this.modelForm.value, this.fields);
    };
    /**
     * Method to check if model's updated
     * @param callbackBefore
     * @param callbackAfter
     */
    AccordionTabProfileComponent.prototype.checkIfDataUpdated = function (callbackBefore, callbackAfter) {
        if (this.compareModels(ProfileUtilities.parseModel(this.modelForm.value, this.fields), this.dataCopy)) {
            if (callbackBefore) {
                callbackBefore();
            }
            this.saveForm(callbackAfter);
        }
    };
    /**
     * Method to trigger profile update
     * @param {IProfile} profile
     */
    AccordionTabProfileComponent.prototype.updateProfile = function (profile) {
        this.accordionService.profileUpdate$.next({
            profile: profile,
            needClose: false
        });
    };
    AccordionTabProfileComponent.prototype.getDate = function (date) {
        if (Date.parse(date)) {
            return new Date(date);
        }
        return null;
    };
    AccordionTabProfileComponent.prototype.parseDate = function (date) {
        if (date instanceof Date) {
            date = date.toString();
        }
        return new Date(date).toDateString();
    };
    __decorate([
        ViewChild('birthDate'),
        __metadata("design:type", Object)
    ], AccordionTabProfileComponent.prototype, "birthDateCalendar", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AccordionTabProfileComponent.prototype, "profile", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AccordionTabProfileComponent.prototype, "accordionId", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AccordionTabProfileComponent.prototype, "onAccordionClose", void 0);
    AccordionTabProfileComponent = __decorate([
        Component({
            selector: 'fmp-accordion-tab-profile',
            templateUrl: 'accordion-tab-profile.html'
        }),
        __metadata("design:paramtypes", [FormBuilder,
            AccordionTabProfileErrors,
            ChangeDetectorRef,
            ProfileAccordionService,
            UserProfileService,
            PlatformCheckService])
    ], AccordionTabProfileComponent);
    return AccordionTabProfileComponent;
}(ShowValidationErrors));
export { AccordionTabProfileComponent };
