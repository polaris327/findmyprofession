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
import { JobAddErrors } from './job-add-modal-errors.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowValidationErrors } from '../../../../core/validators/show-validation-errors.model';
import { WEBSITE_LINK } from '../../../../core/models/regex-patterns.model';
var FmpAddJobComponent = /** @class */ (function (_super) {
    __extends(FmpAddJobComponent, _super);
    function FmpAddJobComponent(fb, errorsFormModel, modalService) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.errorsFormModel = errorsFormModel;
        _this.modalService = modalService;
        _this.modelForm = _this.fb.group({
            link: ['', [
                    Validators.required,
                    Validators.pattern(WEBSITE_LINK)
                ]],
            position: ['', [
                    Validators.required,
                    Validators.maxLength(128)
                ]],
            company: ['', [
                    Validators.required,
                    Validators.maxLength(128)
                ]],
            isGlobalValidate: [{
                    value: false,
                    disabled: true
                }]
        });
        _super.prototype.setData.call(_this, _this.modelForm, _this.errorsFormModel);
        _this.modelForm.valueChanges
            .subscribe(function () { return _super.prototype.onValueChanged.call(_this); });
        _this.fm = _this.errorsFormModel.formErrors;
        return _this;
    }
    FmpAddJobComponent.prototype.ngOnDestroy = function () {
        _super.prototype.clearErrors.call(this);
    };
    FmpAddJobComponent.prototype.saveJob = function () {
        this.modelForm.get('isGlobalValidate').setValue(true);
        _super.prototype.onValueChanged.call(this);
        if (this.modelForm.invalid) {
            return;
        }
        this.modalService.close(this.modelForm.value);
    };
    /**
     * Method to dismiss modal
     */
    FmpAddJobComponent.prototype.cancel = function () {
        this.modalService.dismiss('Client close modal.');
    };
    FmpAddJobComponent.prototype.closeError = function (field) {
        this.fm[field] = '';
    };
    FmpAddJobComponent = __decorate([
        Component({
            selector: 'fmp-add-job-modal',
            templateUrl: 'job-add-modal.html',
            styles: [require('./job-add-modal.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [FormBuilder,
            JobAddErrors,
            NgbActiveModal])
    ], FmpAddJobComponent);
    return FmpAddJobComponent;
}(ShowValidationErrors));
export { FmpAddJobComponent };
