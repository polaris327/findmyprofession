var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PROFILE_QUESTIONS } from './accordion-tab-questions-data.model';
import { FormBuilder } from '@angular/forms';
import { UserProfileService } from '../../user-profile.service';
import { ProfileAccordionService } from '../../profile-accordion.service';
import { Subject } from 'rxjs/Subject';
var AccordionTabQuestionsComponent = /** @class */ (function () {
    function AccordionTabQuestionsComponent(fb, profileService, accordionService) {
        this.fb = fb;
        this.profileService = profileService;
        this.accordionService = accordionService;
        this.isModelChanged = false;
        this.isRequestSending = false;
        this.destroyed$ = new Subject();
        this.questions = PROFILE_QUESTIONS;
        this.accordionSubscriptions();
    }
    AccordionTabQuestionsComponent.prototype.ngOnChanges = function () {
        if (this.profileQuestions) {
            this.buildForm(this.profileQuestions);
        }
    };
    AccordionTabQuestionsComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.checkForUpdate();
    };
    AccordionTabQuestionsComponent.prototype.saveForm = function () {
        var _this = this;
        this.profileService.updateQuestions(this.modelForm.value)
            .do(function () { return _this.isRequestSending = true; })
            .finally(function () { return _this.isRequestSending = false; })
            .subscribe(function (response) {
            _this.accordionService.profileUpdate$.next({
                profile: response,
                activeId: 'profile-accordion-6',
                needClose: false
            });
        }, function (error) { return _this.handleError(error); });
    };
    AccordionTabQuestionsComponent.prototype.setField = function (field, value) {
        this.modelForm.controls[field].setValue(value);
    };
    /**
     * Method to subscribe to accordion service
     */
    AccordionTabQuestionsComponent.prototype.accordionSubscriptions = function () {
        var _this = this;
        this.accordionService.accordionState$
            .takeUntil(this.destroyed$)
            .subscribe(function (state) { return _this.accordionState = state; });
    };
    AccordionTabQuestionsComponent.prototype.buildForm = function (answers) {
        var _this = this;
        this.modelForm = this.fb.group({
            work_authorization: [
                answers ? answers.work_authorization : null
            ],
            gender: [
                answers ? answers.gender : null
            ],
            veteran_status: [
                answers ? answers.veteran_status : null
            ],
            disability_status: [
                answers ? answers.disability_status : null
            ],
            race_ethnicity: [
                answers ? answers.race_ethnicity : null
            ]
        });
        this.modelForm.valueChanges
            .subscribe(function () { return _this.isModelChanged = true; });
    };
    AccordionTabQuestionsComponent.prototype.handleError = function (error) {
        this.errorMessage = error.message;
    };
    AccordionTabQuestionsComponent.prototype.checkForUpdate = function () {
        if (this.isModelChanged) {
            this.saveForm();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AccordionTabQuestionsComponent.prototype, "profileQuestions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AccordionTabQuestionsComponent.prototype, "accordionId", void 0);
    AccordionTabQuestionsComponent = __decorate([
        Component({
            selector: 'fmp-profile-tab-questions',
            templateUrl: 'accordion-tab-questions.html',
            styles: [require('./accordion-tab-questions.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [FormBuilder,
            UserProfileService,
            ProfileAccordionService])
    ], AccordionTabQuestionsComponent);
    return AccordionTabQuestionsComponent;
}());
export { AccordionTabQuestionsComponent };
