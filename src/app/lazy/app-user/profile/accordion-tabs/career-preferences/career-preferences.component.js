var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CAREER_PREFERENCES_DATA } from './career-preferences-data.model';
import { UserProfileService } from '../../user-profile.service';
import { ProfileAccordionService } from '../../profile-accordion.service';
var AccordionTabCareerPreferencesComponent = /** @class */ (function () {
    function AccordionTabCareerPreferencesComponent(fb, profileService, changeDetector, accordionService) {
        this.fb = fb;
        this.profileService = profileService;
        this.changeDetector = changeDetector;
        this.accordionService = accordionService;
        this.isRequestSending = false;
        this.isModelFormChanged = false;
        this.selectData = CAREER_PREFERENCES_DATA;
    }
    AccordionTabCareerPreferencesComponent.prototype.ngAfterViewInit = function () {
        if (this.industryBlock && this.industryBlock.nativeElement) {
            this.industryBlock.nativeElement.scrollIntoView(false);
        }
    };
    AccordionTabCareerPreferencesComponent.prototype.ngOnChanges = function () {
        if (this.careerPreferences) {
            this.buildForm(this.careerPreferences);
        }
    };
    AccordionTabCareerPreferencesComponent.prototype.ngOnDestroy = function () {
        this.checkForChanges();
        this.changeDetector.detach();
    };
    AccordionTabCareerPreferencesComponent.prototype.onSelect = function (field, value) {
        this.modelForm.markAsDirty();
        this.modelForm.controls[field].setValue(value);
    };
    AccordionTabCareerPreferencesComponent.prototype.addNewTag = function (tagTitle, field) {
        this.modelForm.markAsDirty();
        var titles = this.modelForm.controls[field].value;
        if (Array.isArray(titles)) {
            titles.push(tagTitle);
        }
        this.modelForm.controls[field].setValue(titles);
    };
    AccordionTabCareerPreferencesComponent.prototype.removeExistingTag = function (tagTitle, field) {
        this.modelForm.markAsDirty();
        var titles = this.modelForm.controls[field].value;
        if (Array.isArray(titles)) {
            var index = titles.indexOf(tagTitle);
            if (index !== -1) {
                titles.splice(index, 1);
            }
        }
        this.modelForm.controls[field].setValue(titles);
    };
    /**
     * Method to send request to server
     */
    AccordionTabCareerPreferencesComponent.prototype.saveForm = function () {
        var _this = this;
        var request = this.modelForm.value;
        request.job_types = this.parseJobTypes(this.modelForm.value.job_types);
        this.isRequestSending = true;
        this.profileService.updateCareerPreferences(request)
            .finally(function () { return _this.isRequestSending = false; })
            .subscribe(function (response) { return _this.accordionService.profileUpdate$.next({
            profile: response,
            activeId: 'profile-accordion-2',
            needClose: false
        }); }, this.handleError.bind(this));
    };
    /**
     * Method to build FormGroup
     * @param model
     */
    AccordionTabCareerPreferencesComponent.prototype.buildForm = function (model) {
        var _this = this;
        this.modelForm = this.fb.group({
            industry: [model.industry],
            job_titles: [model.job_titles || []],
            job_types: this.fb.array(this.inverseParseJobTypes(model.job_types)),
            education: [model.education],
            experience: [model.experience],
            relocation_value: [model.relocation_value || 0],
            relocation_type: [model.relocation_type],
            relocation_location: [model.relocation_location || []],
            desire_salary_value: [model.desire_salary_value || 0],
            desire_salary_type: [model.desire_salary_type]
        });
        this.changeDetector.detectChanges();
        this.modelForm.get('relocation_value').valueChanges
            .filter(function (valueState) { return !valueState; })
            .subscribe(function (valueState) { return _this.refreshRelocation(); });
        this.modelForm.valueChanges
            .subscribe(function () { return _this.isModelFormChanged = true; });
    };
    /**
     * Method to Parse list of boolean values to selected job types.
     * @param list
     * @returns {any}
     */
    AccordionTabCareerPreferencesComponent.prototype.parseJobTypes = function (list) {
        var array = [];
        if (Array.isArray(list)) {
            return this.selectData.types.filter(function (item, index) {
                return list[index] === true;
            });
        }
        return array;
    };
    /**
     * Method to parse list of string values to selected boolean
     * @param list
     * @returns {[any,any,any,any,any]}
     */
    AccordionTabCareerPreferencesComponent.prototype.inverseParseJobTypes = function (list) {
        if (Array.isArray(list) && Array.isArray(this.selectData.types)) {
            return this.selectData.types.map(function (item) {
                return list.includes(item);
            });
        }
        return this.selectData.types.map(function () { return false; }).slice();
    };
    /**
     * Method to refresh relocation values
     */
    AccordionTabCareerPreferencesComponent.prototype.refreshRelocation = function () {
        this.modelForm.get('relocation_type').setValue(null);
        this.modelForm.get('relocation_location').setValue([]);
    };
    AccordionTabCareerPreferencesComponent.prototype.handleError = function (error) {
        this.errorMessage = error.message;
    };
    AccordionTabCareerPreferencesComponent.prototype.checkForChanges = function () {
        if (this.isModelFormChanged) {
            this.saveForm();
        }
    };
    __decorate([
        ViewChild('desireSalary'),
        __metadata("design:type", Object)
    ], AccordionTabCareerPreferencesComponent.prototype, "desireSalary", void 0);
    __decorate([
        ViewChild('industryBlock'),
        __metadata("design:type", ElementRef)
    ], AccordionTabCareerPreferencesComponent.prototype, "industryBlock", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AccordionTabCareerPreferencesComponent.prototype, "careerPreferences", void 0);
    AccordionTabCareerPreferencesComponent = __decorate([
        Component({
            selector: 'fmp-accordion-tab-career-preferences',
            templateUrl: 'career-preferences.html'
        }),
        __metadata("design:paramtypes", [FormBuilder,
            UserProfileService,
            ChangeDetectorRef,
            ProfileAccordionService])
    ], AccordionTabCareerPreferencesComponent);
    return AccordionTabCareerPreferencesComponent;
}());
export { AccordionTabCareerPreferencesComponent };
