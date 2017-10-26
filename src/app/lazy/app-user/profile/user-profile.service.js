var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { CAREER_PREFERENCES, EDUCATION_EXPERIENCE, PROFILE_DATA, PROFILE_DOCUMENT, PROFILE_QUESTIONS_URL, PROFILE_REFERENCE, WORK_EXPERIENCE } from '../../../core/models/api-urls.model';
import { DOMAIN_URL } from '../../../../main.config';
var UserProfileService = /** @class */ (function () {
    function UserProfileService(httpService) {
        this.httpService = httpService;
    }
    UserProfileService.prototype.updateProfileForm = function (model) {
        var request = {
            method: 'POST',
            url: PROFILE_DATA,
            body: model,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method to update CareerPreferences Form
     * @param model
     * @returns {Observable<any>}
     */
    UserProfileService.prototype.updateCareerPreferences = function (model) {
        var request = {
            method: 'POST',
            url: CAREER_PREFERENCES,
            body: model,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method that creates new Reference
     * @param reference
     * @returns {Observable<any>}
     */
    UserProfileService.prototype.createReference = function (reference) {
        var request = {
            method: 'POST',
            url: PROFILE_REFERENCE,
            body: reference,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method that updates new Reference
     * @param reference
     * @returns {Observable<IProfile>}
     */
    UserProfileService.prototype.updateReference = function (reference) {
        var request = {
            method: 'PUT',
            url: PROFILE_REFERENCE,
            body: reference,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method that updates new Reference
     * @param referenceId
     * @returns {Observable<IProfile>}
     */
    UserProfileService.prototype.removeReference = function (referenceId) {
        var request = {
            method: 'DELETE',
            url: PROFILE_REFERENCE + "/" + referenceId,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method that creates Work Experience or Education entity
     * @param experience
     * @param isEducation
     * @returns {Observable<any>}
     */
    UserProfileService.prototype.createExperienceItem = function (experience, isEducation) {
        if (isEducation === void 0) { isEducation = false; }
        var request = {
            method: 'POST',
            url: isEducation ? EDUCATION_EXPERIENCE : WORK_EXPERIENCE,
            body: experience,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method that updates existing Work Experience or Education entity
     * @param experience
     * @param isEducation
     * @returns {Observable<any>}
     */
    UserProfileService.prototype.updateExperience = function (experience, isEducation) {
        if (isEducation === void 0) { isEducation = false; }
        var request = {
            method: 'PUT',
            url: isEducation ? EDUCATION_EXPERIENCE : WORK_EXPERIENCE,
            body: experience,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method to remove experience entity : Work , Education
     * @param experienceId
     * @param isEducation
     * @returns {Observable<any>}
     */
    UserProfileService.prototype.removeExperienceItem = function (experienceId, isEducation) {
        if (isEducation === void 0) { isEducation = false; }
        var request = {
            method: 'DELETE',
            url: (isEducation ? EDUCATION_EXPERIENCE : WORK_EXPERIENCE) + "/" + experienceId,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    UserProfileService.prototype.updateQuestions = function (answers) {
        var request = {
            method: 'POST',
            url: PROFILE_QUESTIONS_URL,
            body: answers,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method to upload specific document to server
     * @param document
     * @returns {Observable<IProfile | IErrorResponse>}
     */
    UserProfileService.prototype.uploadDocument = function (document) {
        var request = {
            method: 'POST',
            body: { document: document },
            url: PROFILE_DOCUMENT,
            userToken: true,
            encoding: 'fd' /*multipart-data*/
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method to update specific document
     * @param document
     * @returns {Observable<IProfile | IErrorResponse>}
     */
    UserProfileService.prototype.updateDocument = function (document) {
        var request = {
            method: 'PUT',
            body: {
                id: document.id,
                type: document.type
            },
            url: PROFILE_DOCUMENT,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method to remove specific document by id
     * @param docId
     * @returns {Observable<IProfile | IErrorResponse>}
     */
    UserProfileService.prototype.removeDocument = function (docId) {
        var request = {
            method: 'DELETE',
            url: PROFILE_DOCUMENT + "/" + docId,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method to select specific document template by id
     * @param templateId
     * @returns {Observable<Observable<IProfile | IErrorResponse>>}
     */
    UserProfileService.prototype.selectDocumentTemplate = function (templateId) {
        var request = {
            method: 'POST',
            url: '',
            body: { templateId: templateId },
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method to
     * @param fileSrc
     * @returns {Observable<string | IErrorResponse>}
     */
    UserProfileService.prototype.downloadFile = function (fileSrc) {
        var request = {
            url: "" + DOMAIN_URL + fileSrc,
            userToken: true,
            absolutePath: true,
            isBlob: true
        };
        return this.httpService.sendRequest(request);
    };
    UserProfileService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpService])
    ], UserProfileService);
    return UserProfileService;
}());
export { UserProfileService };
