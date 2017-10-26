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
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentInfoValidator } from './payment-info.validator';
import { ShowValidationErrors } from '../../../core/validators/show-validation-errors.model';
import { PaymentInfoErrors } from './payment-info-errors.model';
import { CoreUtilitiesService } from '../../../core/services/core-utilities.service';
var CheckoutPaymentInfoComponent = /** @class */ (function (_super) {
    __extends(CheckoutPaymentInfoComponent, _super);
    function CheckoutPaymentInfoComponent(fb, modelFormErrors, changeDetector) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.modelFormErrors = modelFormErrors;
        _this.changeDetector = changeDetector;
        _this.onModelChanged = new EventEmitter();
        _this.onModelStateChanged = new EventEmitter();
        _this.configs = {
            '14': [/[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
            '15': [/[1-9]/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
            '16': [/[1-9]/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
        };
        _this.cardNumberConfig = {
            mask: _this.configs['16'],
            guide: false,
            keepCharPositions: true,
            type: 'default'
        };
        _this.monthConfig = {
            mask: [
                /[0-9]/, /\d/
            ],
            guide: false,
            keepCharPositions: true
        };
        _this.yearMask = {
            mask: [
                /[1-9]/, /\d/
            ],
            guide: false,
            keepCharPositions: true
        };
        _this.cvcMask = {
            mask: [
                /[0-9]/, /\d/, /\d/, /\d/
            ],
            guide: false,
            keepCharPositions: true
        };
        _this.cardNumberShow = true;
        _this.paymentForm = _this.fb.group({
            number: ['', [
                    Validators.required,
                    PaymentInfoValidator.cardNumberValidator
                ]],
            exp_month: ['', [
                    Validators.required
                ]],
            exp_year: ['', [
                    Validators.required
                ]],
            cvc: ['', [
                    Validators.required,
                    PaymentInfoValidator.cardValidateCVC
                ]],
            isGlobalValidate: [false]
        });
        _super.prototype.setData.call(_this, _this.paymentForm, _this.modelFormErrors);
        _this.fm = _this.modelFormErrors.formErrors;
        _this.paymentForm.statusChanges
            .subscribe(function (value) {
            var state = false;
            if (value === 'VALID') {
                state = true;
            }
            _this.onModelStateChanged.emit(state);
        });
        var expMonth = _this.getForm('exp_month').valueChanges;
        var expYear = _this.getForm('exp_year').valueChanges;
        expMonth.merge(expYear)
            .subscribe(function () {
            var value = PaymentInfoValidator.cardValidateExpiry(_this.getForm('exp_month'), _this.getForm('exp_year'));
            if (value) {
                _this.getForm('exp_month').setErrors(value);
                _this.getForm('exp_year').setErrors(value);
            }
            else {
                _this.getForm('exp_month').setErrors(null);
                _this.getForm('exp_year').setErrors(null);
            }
        });
        _this.paymentForm.valueChanges
            .subscribe(function () {
            _this.onModelChanged.emit(CheckoutPaymentInfoComponent_1.parseModel(_this.paymentForm.value));
            _super.prototype.onValueChanged.call(_this);
        });
        return _this;
    }
    CheckoutPaymentInfoComponent_1 = CheckoutPaymentInfoComponent;
    CheckoutPaymentInfoComponent.prototype.ngOnChanges = function (changes) {
        if (changes['resetTime'] && changes['resetTime'].currentValue) {
            this.resetForm();
        }
        if (changes['isGlobalValidate'] && changes['isGlobalValidate'].currentValue) {
            this.paymentForm.controls['isGlobalValidate'].setValue(this.isGlobalValidate);
            _super.prototype.onValueChanged.call(this);
        }
    };
    /**
     * Check for card number length and change mask
     */
    CheckoutPaymentInfoComponent.prototype.cardNumberBlur = function () {
        var str = CoreUtilitiesService.removeSpaces(this.getForm('number').value);
        if (str) {
            var length_1 = str.length;
            if (length_1 >= 14 && length_1 <= 16) {
                this.cardNumberConfig.mask = this.configs[length_1.toString()];
                this.configType = length_1;
                this.updateCardNumberField();
            }
        }
    };
    CheckoutPaymentInfoComponent.prototype.updateCardNumberField = function () {
        this.cardNumberShow = false;
        this.changeDetector.detectChanges();
        this.cardNumberShow = true;
    };
    CheckoutPaymentInfoComponent.prototype.closeError = function (field) {
        this.fm[field] = null;
    };
    CheckoutPaymentInfoComponent.prototype.resetForm = function () {
        this.modelForm.reset();
    };
    CheckoutPaymentInfoComponent.prototype.getForm = function (name) {
        return this.paymentForm.get(name);
    };
    CheckoutPaymentInfoComponent.parseModel = function (model) {
        return {
            number: model.number ? model.number.toString().replace(/ /g, '') : model.number,
            cvc: model.cvc,
            exp_month: model.exp_month,
            exp_year: CheckoutPaymentInfoComponent_1.parseYear(model.exp_year)
        };
    };
    CheckoutPaymentInfoComponent.parseYear = function (year) {
        if (year === void 0) { year = ''; }
        if (year && year.toString() && year.toString().length === 2) {
            return Number("20" + year);
        }
        return Number(year);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckoutPaymentInfoComponent.prototype, "resetTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckoutPaymentInfoComponent.prototype, "isGlobalValidate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckoutPaymentInfoComponent.prototype, "onModelChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckoutPaymentInfoComponent.prototype, "onModelStateChanged", void 0);
    CheckoutPaymentInfoComponent = CheckoutPaymentInfoComponent_1 = __decorate([
        Component({
            selector: 'fmp-payment-info-component',
            templateUrl: 'payment-info.html',
            styles: [require('./payment-info.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [FormBuilder,
            PaymentInfoErrors,
            ChangeDetectorRef])
    ], CheckoutPaymentInfoComponent);
    return CheckoutPaymentInfoComponent;
    var CheckoutPaymentInfoComponent_1;
}(ShowValidationErrors));
export { CheckoutPaymentInfoComponent };
