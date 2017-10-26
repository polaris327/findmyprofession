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
import { Component, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactUsService } from './contact-us.service';
import { REGEX_EMAIL_PATTERN } from '../../core/validators/validation-patterns.model';
import { ShowValidationErrors } from '../../core/validators/show-validation-errors.model';
import { ContactUsErrors } from './contact-us.model';
import { MetaTags } from '../../core/services/meta-tags.service';
import { APP_CONFIG } from '../../core/models/app.config';
import { PlatformCheckService } from '../../core/services/platform-check.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from '../../modules/success-modal/success-modal.component';
require('../../../assets/images/blue-bg/contact-us.jpg');
var ContactUsComponent = ContactUsComponent_1 = (function (_super) {
    __extends(ContactUsComponent, _super);
    function ContactUsComponent(route, fb, contactUsService, errorFormModel, metaService, domRenderer, platformService, modalService) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.fb = fb;
        _this.contactUsService = contactUsService;
        _this.errorFormModel = errorFormModel;
        _this.metaService = metaService;
        _this.domRenderer = domRenderer;
        _this.platformService = platformService;
        _this.modalService = modalService;
        _this.lang = 'en';
        _this.isRequestSending = false;
        _this.facebook = APP_CONFIG.facebookLink;
        _this.likedIn = APP_CONFIG.linkedInkLink;
        _this.twitter = APP_CONFIG.twitterLink;
        _this.key = APP_CONFIG.recaptcha_key;
        var pageData = route.snapshot.data['pageData'];
        if (pageData) {
            _this.metaService.setMetaTags(pageData);
            _this.content = pageData;
        }
        _this.modelForm = _this.fb.group({
            name: ['', [
                    Validators.required,
                    Validators.minLength(3)
                ]],
            email: ['', [
                    Validators.required,
                    Validators.pattern(REGEX_EMAIL_PATTERN)
                ]],
            message: ['', [
                    Validators.required
                ]],
            captcha: [false, [
                    Validators.requiredTrue
                ]],
            isGlobalValidate: [false]
        });
        _super.prototype.setData.call(_this, _this.modelForm, _this.errorFormModel);
        _this.modelForm.valueChanges
            .subscribe(function () { return _super.prototype.onValueChanged.call(_this); });
        _this.fm = _this.errorFormModel.formErrors;
        return _this;
    }
    ContactUsComponent.prototype.ngAfterViewInit = function () {
        if (this.platformService.isBrowser) {
            this.registerReCaptchaCallback();
            this.addScript();
        }
    };
    ContactUsComponent.prototype.ngOnDestroy = function () {
        _super.prototype.clearErrors.call(this);
    };
    ContactUsComponent.prototype.closeError = function (field) {
        this.fm[field] = '';
    };
    ContactUsComponent.prototype.handleCorrectCaptcha = function () {
        this.modelForm.controls['captcha'].setValue(true);
    };
    /**
     * Send form to backend
     */
    ContactUsComponent.prototype.sendForm = function () {
        var _this = this;
        if (!this.modelForm) {
            return;
        }
        this.errorMessage = '';
        this.modelForm.controls['isGlobalValidate'].setValue(true);
        _super.prototype.onValueChanged.call(this);
        if (this.modelForm.invalid) {
            this.errorMessage = 'Form not valid.';
            return;
        }
        this.isRequestSending = true;
        this.contactUsService.sendForm(ContactUsComponent_1.parseObject(this.modelForm.value))
            .finally(function () { return _this.isRequestSending = false; })
            .subscribe(function () {
            _this.modelForm.reset();
            _this.refreshReCaptch();
            _this.openModal();
        }, function (error) { return _this.errorMessage = error.message; });
    };
    ContactUsComponent.prototype.openModal = function () {
        var modal = this.modalService.open(SuccessModalComponent);
        modal.componentInstance.message = 'Your message was successfully sent.';
        modal.componentInstance.icon = 'subscribe';
    };
    /**
     * Parse model to request
     * @param model
     * @returns {{name, email, message}}
     */
    ContactUsComponent.parseObject = function (model) {
        return {
            name: model.name,
            email: model.email,
            message: model.message
        };
    };
    ContactUsComponent.prototype.registerReCaptchaCallback = function () {
        var _this = this;
        window['reCaptchaLoad'] = function () {
            var config = {
                'sitekey': _this.key,
                'callback': _this.handleCorrectCaptcha.bind(_this),
                'expired-callback': _this.onExpired.bind(_this)
            };
            _this.widgetId = _this.render(_this.recaptcha.nativeElement, config);
        };
    };
    ContactUsComponent.prototype.onExpired = function () {
        this.errorFormModel.formErrors.captcha = 'Captcha expired.';
    };
    ContactUsComponent.prototype.render = function (element, config) {
        return window['grecaptcha'].render(element, config);
    };
    ContactUsComponent.prototype.addScript = function () {
        var script = this.domRenderer.createElement('script');
        var lang = this.lang ? '&hl=' + this.lang : '';
        script.src = APP_CONFIG.recaptcha_link + "?onload=reCaptchaLoad&render=explicit" + lang;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    };
    ContactUsComponent.prototype.refreshReCaptch = function () {
        window['grecaptcha'].reset(this.widgetId);
    };
    return ContactUsComponent;
}(ShowValidationErrors));
__decorate([
    ViewChild('recaptcha'),
    __metadata("design:type", Object)
], ContactUsComponent.prototype, "recaptcha", void 0);
ContactUsComponent = ContactUsComponent_1 = __decorate([
    Component({
        selector: 'contact-us-component',
        templateUrl: 'contact-us.component.html',
        styles: [require('./contact-us.component.scss').toString()],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        FormBuilder,
        ContactUsService,
        ContactUsErrors,
        MetaTags,
        Renderer2,
        PlatformCheckService,
        NgbModal])
], ContactUsComponent);
export { ContactUsComponent };
var ContactUsComponent_1;
