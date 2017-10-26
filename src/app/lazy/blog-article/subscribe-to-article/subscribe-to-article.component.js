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
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { REGEX_EMAIL_PATTERN } from '../../../core/validators/validation-patterns.model';
import { BlogArticleService } from '../blog-article.service';
import { ShowValidationErrors } from '../../../core/validators/show-validation-errors.model';
import { SubscribeToArticleErrors } from './subscribe-to-article.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from '../../../modules/success-modal/success-modal.component';
var SubscribeToArticleComponent = /** @class */ (function (_super) {
    __extends(SubscribeToArticleComponent, _super);
    function SubscribeToArticleComponent(fb, blogArticleService, errorFormModel, modalService) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.blogArticleService = blogArticleService;
        _this.errorFormModel = errorFormModel;
        _this.modalService = modalService;
        _this.isRequestSending = false;
        _this.buildModelForm();
        return _this;
    }
    /**
     * Method to subscribe to article
     */
    SubscribeToArticleComponent.prototype.subscribeToArticle = function () {
        var _this = this;
        this.setGlobal(true);
        _super.prototype.onValueChanged.call(this);
        if (this.modelForm.invalid) {
            return;
        }
        var email = this.modelForm.value.email;
        this.isRequestSending = true;
        this.modelForm.get('email').disable();
        this.blogArticleService.subscribeToArticle(email)
            .finally(function () { return _this.isRequestSending = false; })
            .subscribe(function () {
            var modal = _this.modalService.open(SuccessModalComponent, { backdrop: true });
            modal.componentInstance.message = "Check your inbox for some Find My Profession greatness";
            modal.componentInstance.icon = 'subscribe';
            _this.modelForm.reset();
        }, function (error) {
            _this.modelForm.get('email').enable();
            _this.fm.email = error.message;
        });
    };
    SubscribeToArticleComponent.prototype.closeError = function () {
        this.fm.email = '';
    };
    SubscribeToArticleComponent.prototype.ngOnDestroy = function () {
        _super.prototype.clearErrors.call(this);
        this.modelForm.reset();
    };
    /**
     * Method to build reactive form model
     */
    SubscribeToArticleComponent.prototype.buildModelForm = function () {
        var _this = this;
        this.modelForm = this.fb.group({
            email: ['', [
                    Validators.required,
                    Validators.pattern(REGEX_EMAIL_PATTERN)
                ]],
            isGlobalValidate: [false]
        });
        _super.prototype.setData.call(this, this.modelForm, this.errorFormModel);
        this.fm = this.errorFormModel.formErrors;
        this.modelForm.get('email').valueChanges
            .filter(function () { return _this.modelForm.get('isGlobalValidate').value; })
            .subscribe(function () {
            _this.setGlobal(false);
            _super.prototype.onValueChanged.call(_this);
            _super.prototype.clearErrors.call(_this);
        });
    };
    /**
     * Set global validate value as params value
     * @param value
     */
    SubscribeToArticleComponent.prototype.setGlobal = function (value) {
        this.modelForm.controls['isGlobalValidate'].setValue(value);
    };
    __decorate([
        ViewChild('element'),
        __metadata("design:type", ElementRef)
    ], SubscribeToArticleComponent.prototype, "element", void 0);
    SubscribeToArticleComponent = __decorate([
        Component({
            selector: 'subscribe-to-article-component',
            templateUrl: 'subscribe-to-article.html',
            styles: [require('./subscribe-to-article.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [FormBuilder,
            BlogArticleService,
            SubscribeToArticleErrors,
            NgbModal])
    ], SubscribeToArticleComponent);
    return SubscribeToArticleComponent;
}(ShowValidationErrors));
export { SubscribeToArticleComponent };
