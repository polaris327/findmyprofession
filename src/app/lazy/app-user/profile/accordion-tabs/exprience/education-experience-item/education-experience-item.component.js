var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfileTabMode } from '../../../user-profile.model';
import { ProfileUtilities } from '../../../profile-utilities.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../../../../../modules/alert-modal/alert-modal.component';
var EducationItemComponent = /** @class */ (function () {
    function EducationItemComponent(fb, modalService) {
        this.fb = fb;
        this.modalService = modalService;
        this.onItemCreate = new EventEmitter();
        this.onItemEditStart = new EventEmitter();
        this.onItemUpdate = new EventEmitter();
        this.onItemRemove = new EventEmitter();
        this.errorMessage = null;
        this.fields = [
            'id',
            'institution',
            'discipline',
            'start_date',
            'level',
            'end_date'
        ];
        this.educationLevels = [
            'High School Diploma',
            'Associates Degree',
            'Bachelors Degree',
            'Master or Ph.D'
        ];
        this.defaultDate = new Date();
        this.startDateYearsRange = ProfileUtilities.getDatesRangePeriod(0, 70);
        this.endDateYearsRange = ProfileUtilities.getDatesRangePeriod(-10, 70);
    }
    EducationItemComponent.prototype.ngOnChanges = function (changes) {
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
    EducationItemComponent.prototype.ngOnDestroy = function () {
        this.errorMessage = null;
        this.modelForm.reset();
    };
    EducationItemComponent.prototype.toggleDatePicker = function (event, type) {
        if (type === 'start') {
            this.startDatePicker.showOverlay(this.startDatePicker.inputfieldViewChild.nativeElement);
        }
        else {
            this.endDatePicker.showOverlay(this.endDatePicker.inputfieldViewChild.nativeElement);
        }
        event.stopPropagation();
    };
    EducationItemComponent.prototype.submitItem = function () {
        if (this.mode === ProfileTabMode.CREATE) {
            this.createReference();
        }
        else {
            ProfileUtilities.changeModelMode(ProfileTabMode.VIEW, this.modelForm);
            this.modelForm.value.id = this.item.id;
            this.modelForm.value.start_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.start_date);
            this.modelForm.value.end_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.end_date);
            this.onItemUpdate.emit(ProfileUtilities.parseModel(this.modelForm.value, this.fields));
        }
    };
    EducationItemComponent.prototype.closeError = function () {
        this.errorMessage = null;
    };
    EducationItemComponent.prototype.createReference = function () {
        var isBlank = ProfileUtilities.checkForBlank(this.modelForm.value);
        if (isBlank) {
            this.errorMessage = 'Please fill out all fields.';
        }
        else {
            this.modelForm.value.start_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.start_date);
            this.modelForm.value.end_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.end_date);
            this.onItemCreate.emit(this.modelForm.value);
        }
    };
    EducationItemComponent.prototype.onEdit = function () {
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
    EducationItemComponent.prototype.removeItem = function () {
        var _this = this;
        var isVoid = !this.fields.some(function (field) { return _this.modelForm.value[field]; });
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
                modal.componentInstance.message = "Are you sure you want to cancel creating education experience?";
            }
            else {
                modal.componentInstance.message = "Are you sure you want to remove " + (this.item.institution || 'selected') + " education?";
            }
        }
        else {
            this.onItemRemove.emit(this.item.id || 0);
        }
    };
    EducationItemComponent.prototype.educationLevelChanged = function (level) {
        this.modelForm.get('level').setValue(level);
    };
    EducationItemComponent.prototype.createForm = function (item) {
        this.buildForm(item);
    };
    EducationItemComponent.prototype.buildForm = function (item) {
        var _this = this;
        if (!item) {
            item = ProfileUtilities.createObject(this.fields);
        }
        this.modelForm = this.fb.group({
            institution: [item.institution],
            discipline: [item.discipline],
            level: [item.level],
            start_date: [ProfileUtilities.checkDate(item.start_date)],
            end_date: [ProfileUtilities.checkDate(item.end_date)]
        });
        this.modelForm.valueChanges
            .filter(function () { return !!_this.errorMessage; })
            .subscribe(function () { return _this.errorMessage = null; });
    };
    __decorate([
        ViewChild('startDatePicker'),
        __metadata("design:type", Object)
    ], EducationItemComponent.prototype, "startDatePicker", void 0);
    __decorate([
        ViewChild('endDatePicker'),
        __metadata("design:type", Object)
    ], EducationItemComponent.prototype, "endDatePicker", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], EducationItemComponent.prototype, "mode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], EducationItemComponent.prototype, "item", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], EducationItemComponent.prototype, "serverError", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], EducationItemComponent.prototype, "onItemCreate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], EducationItemComponent.prototype, "onItemEditStart", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], EducationItemComponent.prototype, "onItemUpdate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], EducationItemComponent.prototype, "onItemRemove", void 0);
    EducationItemComponent = __decorate([
        Component({
            selector: 'fmp-education-experience-item',
            templateUrl: 'education-experience-item.html'
        }),
        __metadata("design:paramtypes", [FormBuilder,
            NgbModal])
    ], EducationItemComponent);
    return EducationItemComponent;
}());
export { EducationItemComponent };
