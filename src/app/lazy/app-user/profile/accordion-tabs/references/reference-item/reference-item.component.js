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
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../../../../../modules/alert-modal/alert-modal.component';
import { ProfileUtilities } from '../../../profile-utilities.service';
import { ProfileTabMode } from '../../../user-profile.model';
var ReferenceItemComponent = /** @class */ (function () {
    function ReferenceItemComponent(fb, modalService) {
        this.fb = fb;
        this.modalService = modalService;
        this.onItemCreate = new EventEmitter();
        this.onItemRemove = new EventEmitter();
        this.onItemEditStart = new EventEmitter();
        this.onItemUpdate = new EventEmitter();
        this.isRequestSending = false;
        /**
         * Fields that need to send to server
         * @type {[string,string,string,string,string,string,string]}
         */
        this.fields = [
            'id',
            'name',
            'job_title',
            'company',
            'email',
            'phone_number',
            'relationship'
        ];
    }
    /**
     * Detect of mode changes
     * @param changes
     */
    ReferenceItemComponent.prototype.ngOnChanges = function (changes) {
        /**
         * If mode
         */
        if (changes['item'] && changes['item'].currentValue) {
            if (this.mode === ProfileTabMode.CREATE) {
                this.createForm();
            }
            else {
                this.createForm(this.item);
            }
        }
        if (changes['mode'] && changes['mode'].currentValue) {
            ProfileUtilities.changeModelMode(this.mode, this.modelForm);
        }
        var serverError = changes['serverError'];
        if (serverError && !serverError.firstChange && serverError.currentValue !== null) {
            this.errorMessage = this.serverError;
        }
    };
    ReferenceItemComponent.prototype.ngOnDestroy = function () {
        this.modelForm.reset();
    };
    ReferenceItemComponent.prototype.submitItem = function () {
        if (this.mode === ProfileTabMode.CREATE) {
            this.createReference();
        }
        else {
            ProfileUtilities.changeModelMode(ProfileTabMode.VIEW, this.modelForm);
            this.modelForm.value.id = this.item.id;
            this.onItemUpdate.emit(ProfileUtilities.parseModel(this.modelForm.value, this.fields));
        }
    };
    ReferenceItemComponent.prototype.createReference = function () {
        var isBlank = ProfileUtilities.checkForBlank(this.modelForm.value);
        if (isBlank) {
            this.errorMessage = 'Please fill out all fields.';
        }
        else {
            this.onItemCreate.emit(ProfileUtilities.parseModel(this.modelForm.value, this.fields));
        }
    };
    /**
     * method to switch mode
     */
    ReferenceItemComponent.prototype.switchEditMode = function () {
        if (this.mode === ProfileTabMode.VIEW) {
            this.mode = ProfileTabMode.EDIT;
            this.onItemEditStart.emit(this.mode);
        }
        else {
            this.mode = ProfileTabMode.VIEW;
        }
        ProfileUtilities.changeModelMode(this.mode, this.modelForm);
    };
    ReferenceItemComponent.prototype.inputField = function (field, value) {
        if (this.modelForm.controls[field]) {
            this.modelForm.controls[field].setValue(value);
        }
    };
    /**
     * Method to remove item
     */
    ReferenceItemComponent.prototype.removeItem = function () {
        var _this = this;
        var isVoid = !this.fields.some(function (field) { return _this.modelForm.value[field]; });
        if (!isVoid) {
            var modal = this.modalService.open(AlertModalComponent, {
                backdrop: false
            });
            Observable.fromPromise(modal.result)
                .subscribe(function () { return _this.onItemRemove.emit(_this.item.id || 0); }, function () { });
            modal.componentInstance.title = 'Wait';
            if (this.mode === ProfileTabMode.CREATE) {
                modal.componentInstance.message = "Are you sure you want to cancel creating reference? ";
            }
            else {
                modal.componentInstance.message = "Are you sure you want to remove " + (this.item.name || 'selected') + " reference?";
            }
        }
        else {
            this.onItemRemove.emit(this.item.id || 0);
        }
    };
    ReferenceItemComponent.prototype.closeError = function () {
        this.errorMessage = '';
    };
    /**
     * Method that creates new form
     * @param item
     */
    ReferenceItemComponent.prototype.createForm = function (item) {
        this.buildForm(item);
    };
    /**
     * Method to build FormGroup
     * @param item
     */
    ReferenceItemComponent.prototype.buildForm = function (item) {
        var _this = this;
        this.modelForm = this.fb.group({
            name: [item ? item.name : null],
            job_title: [item ? item.job_title : null],
            company: [item ? item.company : null],
            email: [item ? item.email : null],
            phone_number: [item ? item.phone_number : null],
            relationship: [item ? item.relationship : null]
        });
        this.modelForm.valueChanges
            .filter(function () { return !!_this.errorMessage; })
            .subscribe(function () { return _this.errorMessage = null; });
        ProfileUtilities.changeModelMode(ProfileTabMode.CREATE, this.modelForm);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ReferenceItemComponent.prototype, "mode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ReferenceItemComponent.prototype, "item", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ReferenceItemComponent.prototype, "serverError", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ReferenceItemComponent.prototype, "onItemCreate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ReferenceItemComponent.prototype, "onItemRemove", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ReferenceItemComponent.prototype, "onItemEditStart", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ReferenceItemComponent.prototype, "onItemUpdate", void 0);
    ReferenceItemComponent = __decorate([
        Component({
            selector: 'fmp-reference-item-component',
            templateUrl: 'reference-item.html'
        }),
        __metadata("design:paramtypes", [FormBuilder,
            NgbModal])
    ], ReferenceItemComponent);
    return ReferenceItemComponent;
}());
export { ReferenceItemComponent };
