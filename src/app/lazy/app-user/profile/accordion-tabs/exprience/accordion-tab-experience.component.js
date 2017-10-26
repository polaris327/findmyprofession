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
import { ProfileTabMode } from '../../user-profile.model';
import { UserProfileService } from '../../user-profile.service';
var AccordionTabExperienceComponent = /** @class */ (function () {
    function AccordionTabExperienceComponent(profileService) {
        this.profileService = profileService;
        this.onProfileUpdate = new EventEmitter();
        this.workExperienceEntity = {
            employer: '',
            job_title: '',
            start_date: '',
            end_date: '',
            salary_earned: 0,
            reason_for_leaving: ''
        };
        this.educationExperienceEntity = {
            institution: '',
            discipline: '',
            level: '',
            start_date: '',
            end_date: ''
        };
    }
    AccordionTabExperienceComponent.prototype.ngOnChanges = function (changes) {
        if (changes['workExperience'] && changes['workExperience'].currentValue) {
            this.workExperienceList = {
                creating: [],
                existing: this.workExperience.map(function (item) {
                    return {
                        item: item,
                        mode: ProfileTabMode.VIEW
                    };
                }).slice()
            };
        }
        if (changes['educationExperience'] && changes['educationExperience'].currentValue) {
            this.educationExperienceList = {
                creating: [],
                existing: this.educationExperience.map(function (item) {
                    return {
                        item: item,
                        mode: ProfileTabMode.VIEW
                    };
                }).slice()
            };
        }
    };
    AccordionTabExperienceComponent.prototype.itemEditStart = function (mode, item) {
        item.mode = mode;
    };
    /**
     * Method to remove Work Experience or Education entity
     * @param itemId - id of entity
     * @param itemIndex - index in array
     * @param mode - current tab entity mode
     * @param isEducation - if flag true , will send to education
     */
    AccordionTabExperienceComponent.prototype.removeExperience = function (itemId, itemIndex, mode, isEducation) {
        var _this = this;
        if (isEducation === void 0) { isEducation = false; }
        if (mode === ProfileTabMode.CREATE) {
            if (isEducation) {
                this.educationExperienceList.creating.splice(0, 1);
            }
            else {
                this.workExperienceList.creating.splice(0, 1);
            }
        }
        else {
            this.profileService.removeExperienceItem(itemId, isEducation)
                .subscribe(function (response) {
                _this.removeExperienceFromList(itemIndex);
                _this.updateProfile(response);
            }, function (error) { return _this.handleError(error); });
        }
    };
    /**
     * Remove entity from local list
     * @param itemIndex
     * @param isEducation
     */
    AccordionTabExperienceComponent.prototype.removeExperienceFromList = function (itemIndex, isEducation) {
        if (isEducation === void 0) { isEducation = false; }
        if (isEducation) {
            this.educationExperienceList.existing.splice(itemIndex, 1);
        }
        else {
            this.workExperienceList.existing.splice(itemIndex, 1);
        }
    };
    /**
     * Method that creates Work Experience Entity
     */
    AccordionTabExperienceComponent.prototype.addWorkExperience = function () {
        if (this.workExperienceList.creating && this.workExperienceList.existing) {
            var list = this.workExperienceList.creating;
            this.workExperienceList.existing.forEach(function (item) {
                item.mode = ProfileTabMode.VIEW;
            });
            if (Array.isArray(list) && list.length === 0) {
                this.workExperienceList.creating.push(Object.assign({}, this.workExperienceEntity));
            }
        }
    };
    /**
     * Method that creates Education Experience Entity
     */
    AccordionTabExperienceComponent.prototype.addEducationExperience = function () {
        if (this.educationExperienceList.creating && this.educationExperienceList.existing) {
            var list = this.educationExperienceList.creating;
            this.educationExperienceList.existing.forEach(function (item) {
                item.mode = ProfileTabMode.VIEW;
            });
            if (Array.isArray(list) && list.length === 0) {
                this.educationExperienceList.creating.push(Object.assign({}, this.educationExperienceEntity));
            }
        }
    };
    /**
     * Method that updates Work Experience or Education entity
     * @param experience
     * @param item
     * @param isEducation if need to update Education , must be true
     */
    AccordionTabExperienceComponent.prototype.updateExperience = function (experience, item, isEducation) {
        var _this = this;
        if (isEducation === void 0) { isEducation = false; }
        this.profileService.updateExperience(experience, isEducation)
            .subscribe(function (profile) {
            item.mode = ProfileTabMode.VIEW;
            _this.updateProfile(profile);
        }, function (error) { return _this.handleError(error); });
    };
    /**
     * Method that send Work Experience Entity to server
     * @param item
     */
    AccordionTabExperienceComponent.prototype.createWorkExperienceItem = function (item) {
        var _this = this;
        if (this.workExperienceList.creating && this.workExperienceList.existing) {
            this.profileService.createExperienceItem(item)
                .subscribe(function (response) {
                _this.workExperienceList.creating = [];
                _this.workExperienceList.existing.push({
                    item: item,
                    mode: ProfileTabMode.VIEW
                });
                _this.updateProfile(response);
            }, function (error) { return _this.handleError(error); });
        }
    };
    /**
     * Method that send Education Experience Entity to server
     * @param item
     */
    AccordionTabExperienceComponent.prototype.createEducationExperienceItem = function (item) {
        var _this = this;
        if (this.educationExperienceList.creating && this.educationExperienceList.existing) {
            this.profileService.createExperienceItem(item, true)
                .subscribe(function (response) {
                _this.educationExperienceList.creating = [];
                _this.educationExperienceList.existing.push({
                    item: item,
                    mode: ProfileTabMode.VIEW
                });
                _this.updateProfile(response);
            }, function (error) { return _this.handleError(error); });
        }
    };
    /**
     * Method to handle error message
     * @param error
     */
    AccordionTabExperienceComponent.prototype.handleError = function (error) {
        this.errorMessage = error.message;
    };
    /**
     * Method to update profile
     * @param profile
     */
    AccordionTabExperienceComponent.prototype.updateProfile = function (profile) {
        this.onProfileUpdate.emit(profile);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AccordionTabExperienceComponent.prototype, "workExperience", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AccordionTabExperienceComponent.prototype, "educationExperience", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AccordionTabExperienceComponent.prototype, "onProfileUpdate", void 0);
    AccordionTabExperienceComponent = __decorate([
        Component({
            selector: 'fmp-accordion-tab-experience',
            templateUrl: 'accordion-tab-experience.html'
        }),
        __metadata("design:paramtypes", [UserProfileService])
    ], AccordionTabExperienceComponent);
    return AccordionTabExperienceComponent;
}());
export { AccordionTabExperienceComponent };
