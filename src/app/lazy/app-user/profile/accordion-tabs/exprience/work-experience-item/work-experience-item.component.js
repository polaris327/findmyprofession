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
import { FormBuilder } from '@angular/forms';
import { ProfileTabMode } from '../../../user-profile.model';
import { ProfileUtilities } from '../../../profile-utilities.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../../../../../modules/alert-modal/alert-modal.component';
import { PlatformCheckService } from '../../../../../../core/services/platform-check.service';
var WorkExperienceItemComponent = /** @class */ (function () {
    function WorkExperienceItemComponent(fb, modalService, platformCheck) {
        this.fb = fb;
        this.modalService = modalService;
        this.platformCheck = platformCheck;
        this.onItemCreate = new EventEmitter();
        this.onItemEditStart = new EventEmitter();
        this.onItemUpdate = new EventEmitter();
        this.onItemRemove = new EventEmitter();
        this.presentTime = 'Present';
        this.componentInited = false;
        this.endDatePlaceholder = null;
        this.maxDate = new Date();
        this.fields = [
            'id',
            'employer',
            'job_title',
            'start_date',
            'end_date',
            'salary_earned',
            'employer',
            'reason_for_leaving'
        ];
        this.defaultDate = new Date();
        this.birthDateYearsRange = ProfileUtilities.getDatesRangePeriod(0, 70);
    }
    WorkExperienceItemComponent.prototype.ngOnChanges = function (changes) {
        if (this.item) {
            this.createForm(this.item);
            if (this.mode === ProfileTabMode.VIEW) {
                ProfileUtilities.changeModelMode(ProfileTabMode.VIEW, this.modelForm);
            }
        }
        if (this.serverError) {
            this.errorMessage = this.serverError;
        }
    };
    WorkExperienceItemComponent.prototype.ngOnDestroy = function () {
        this.closeError();
    };
    WorkExperienceItemComponent.prototype.ngOnInit = function () {
        if (this.platformCheck.isBrowser) {
            this.componentInited = true;
        }
    };
    WorkExperienceItemComponent.prototype.toggleDatePicker = function (event, type) {
        if (type === 'start') {
            this.startDatePicker.showOverlay(this.startDatePicker.inputfieldViewChild.nativeElement);
        }
        else {
            this.endDatePicker.showOverlay(this.endDatePicker.inputfieldViewChild.nativeElement);
        }
        event.stopPropagation();
    };
    WorkExperienceItemComponent.prototype.closeError = function () {
        this.errorMessage = null;
    };
    WorkExperienceItemComponent.prototype.submitItem = function () {
        if (this.mode === ProfileTabMode.CREATE) {
            this.createReference();
        }
        else {
            this.updateItem();
            ProfileUtilities.changeModelMode(ProfileTabMode.VIEW, this.modelForm);
        }
    };
    WorkExperienceItemComponent.prototype.createReference = function () {
        var isBlank = this.checkForBlank(this.modelForm.value);
        if (isBlank) {
            this.errorMessage = 'Please fill out all fields.';
        }
        else {
            this.checkSalaryEarnedValue();
            this.modelForm.value.start_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.start_date);
            this.modelForm.value.end_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.end_date);
            this.onItemCreate.emit(this.parseModel(ProfileUtilities.parseModel(this.modelForm.value, this.fields)));
        }
    };
    WorkExperienceItemComponent.prototype.onEdit = function () {
        if (this.mode === ProfileTabMode.VIEW) {
            this.mode = ProfileTabMode.EDIT;
            this.onItemEditStart.emit(this.mode);
        }
        else {
            this.mode = ProfileTabMode.VIEW;
        }
        ProfileUtilities.changeModelMode(this.mode, this.modelForm);
    };
    /**
     * Method to remove item
     */
    WorkExperienceItemComponent.prototype.removeItem = function () {
        var _this = this;
        var isVoid = !this.fields.some(function (field) {
            if (field === 'end_date' && _this.modelForm.value[field] === _this.presentTime) {
                return false;
            }
            return _this.modelForm.value[field];
        });
        if (!isVoid) {
            var modal = this.modalService.open(AlertModalComponent, {
                backdrop: false
            });
            modal.result.then(function () {
                _this.onItemRemove.emit(_this.item.id || 0);
            }, function () {
                /*Canceled*/
            });
            modal.componentInstance.title = 'Wait';
            if (this.mode === ProfileTabMode.CREATE) {
                modal.componentInstance.message = "Are you sure you want to cancel creating work experience? ";
            }
            else {
                modal.componentInstance.message = "Are you sure you want to remove " + (this.item.employer || 'selected') + " experience?";
            }
        }
        else {
            this.onItemRemove.emit(this.item.id || 0);
        }
    };
    /**
     * Method to update item, send to server
     */
    WorkExperienceItemComponent.prototype.updateItem = function () {
        var _this = this;
        Object.keys(this.modelForm.value)
            .forEach(function (field) {
            if (_this.fields.some(function (innerField) { return innerField === field; })) {
                _this.modelForm.enable();
            }
            else {
                _this.modelForm.disable();
            }
        });
        this.modelForm.value.start_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.start_date);
        this.modelForm.value.end_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.end_date);
        var endDateValue = this.modelForm.value.end_date;
        if (endDateValue === this.presentTime) {
            this.modelForm.value.end_date = null;
        }
        this.modelForm.value.id = this.item.id;
        var model = {};
        this.fields.forEach(function (field) {
            model[field] = _this.modelForm.value[field];
        });
        this.onItemUpdate.emit(model);
    };
    WorkExperienceItemComponent.prototype.createForm = function (item) {
        this.buildForm(item);
    };
    WorkExperienceItemComponent.prototype.parseModel = function (model) {
        if (model.end_date === this.presentTime) {
            model.end_date = null;
        }
        return model;
    };
    WorkExperienceItemComponent.prototype.checkSalaryEarnedValue = function () {
        var salaryValue = this.modelForm.get('salary_earned').value;
        if (Number.isNaN(+salaryValue) || salaryValue < 0) {
            this.modelForm.get('salary_earned').setValue(+Math.abs(salaryValue));
        }
    };
    WorkExperienceItemComponent.prototype.buildForm = function (item) {
        var _this = this;
        if (!item) {
            item = ProfileUtilities.createObject(this.fields);
        }
        this.modelForm = this.fb.group({
            employer: [item.employer],
            job_title: [item.job_title],
            start_date: [ProfileUtilities.checkDate(item.start_date)],
            end_date: [ProfileUtilities.checkDate(item.end_date)],
            salary_earned: [item.salary_earned],
            reason_for_leaving: [item.reason_for_leaving],
            currentlyWorkHere: [!item.end_date]
        });
        if (!item.end_date) {
            this.endDatePlaceholder = this.presentTime;
            this.modelForm.get('end_date').disable();
        }
        if (this.mode === ProfileTabMode.CREATE) {
            this.endDatePlaceholder = null;
            this.modelForm.get('end_date').enable();
            this.modelForm.get('currentlyWorkHere').setValue(false);
        }
        this.modelForm.valueChanges
            .filter(function () { return !!_this.errorMessage; })
            .subscribe(function () { return _this.errorMessage = null; });
    };
    WorkExperienceItemComponent.prototype.currentlyWorkHereChanged = function (state) {
        var endDate = this.modelForm.get('end_date');
        if (state) {
            endDate.setValue(null);
            this.endDatePlaceholder = this.presentTime;
        }
        else {
            endDate.setValue(null);
            this.endDatePlaceholder = 'Select end date';
        }
        state ? endDate.disable() : endDate.enable();
    };
    /**
     * Return if Model is blank
     * @param model
     * @returns {boolean}
     */
    WorkExperienceItemComponent.prototype.checkForBlank = function (model) {
        var _this = this;
        if (model) {
            return !Object.keys(model).some(function (key) {
                if (key === 'end_date' && model[key] === _this.presentTime) {
                    return false;
                }
                return !!model[key];
            });
        }
        return false;
    };
    __decorate([
        ViewChild('startDatePicker'),
        __metadata("design:type", Object)
    ], WorkExperienceItemComponent.prototype, "startDatePicker", void 0);
    __decorate([
        ViewChild('endDatePicker'),
        __metadata("design:type", Object)
    ], WorkExperienceItemComponent.prototype, "endDatePicker", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], WorkExperienceItemComponent.prototype, "mode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], WorkExperienceItemComponent.prototype, "item", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], WorkExperienceItemComponent.prototype, "serverError", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], WorkExperienceItemComponent.prototype, "onItemCreate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], WorkExperienceItemComponent.prototype, "onItemEditStart", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], WorkExperienceItemComponent.prototype, "onItemUpdate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], WorkExperienceItemComponent.prototype, "onItemRemove", void 0);
    WorkExperienceItemComponent = __decorate([
        Component({
            selector: 'fmp-work-experience-item',
            templateUrl: 'work-experience-item.html',
            styles: [require('./work-experience-item.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [FormBuilder,
            NgbModal,
            PlatformCheckService])
    ], WorkExperienceItemComponent);
    return WorkExperienceItemComponent;
}());
export { WorkExperienceItemComponent };
