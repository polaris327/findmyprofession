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
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../../core/services/http.service';
import { DOMAIN_URL } from '../../../../main.config';
var UserJobsService = /** @class */ (function () {
    function UserJobsService(httpService) {
        this.httpService = httpService;
    }
    UserJobsService.prototype.getJobs = function (type, page, filter) {
        var request = {
            url: "/job/" + type,
            userToken: true,
            searchParams: {
                filter: filter || null,
                page: page
            }
        };
        return this.httpService.sendRequest(request);
    };
    UserJobsService.prototype.setJobStatus = function (id, status, page, option) {
        var request = {
            method: 'PUT',
            url: "/job-status/" + id,
            body: { status: status },
            searchParams: {
                page: page,
                filter: option
            },
            userToken: true,
        };
        return this.httpService.sendRequest(request);
    };
    UserJobsService.prototype.downloadFile = function (link) {
        var request = {
            url: "" + DOMAIN_URL + link,
            userToken: true,
            absolutePath: true,
            isBlob: true
        };
        return this.httpService.sendRequest(request);
    };
    UserJobsService.prototype.addJob = function (job) {
        var request = {
            method: 'POST',
            url: '/job',
            body: job,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    UserJobsService.prototype.removeJob = function (jobId, page) {
        if (page === void 0) { page = 1; }
        var request = {
            method: 'DELETE',
            url: "/job/" + jobId,
            searchParams: {
                page: page || null
            },
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    UserJobsService.prototype.changeApplyStatus = function (id, checked, page) {
        var request = {
            method: 'PUT',
            url: "/job/" + id,
            body: { checked: checked },
            searchParams: {
                page: page || null
            },
            userToken: true,
        };
        return this.httpService.sendRequest(request);
    };
    UserJobsService.prototype.uploadCoverLetter = function (file, jobId) {
        var request = {
            method: 'POST',
            url: "/job/cover/" + jobId,
            body: { file: file },
            encoding: 'fd',
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    UserJobsService.prototype.removeCoverLetter = function (jobId) {
        var request = {
            method: 'DELETE',
            url: "/job/cover/" + jobId,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method to get Career Finder price
     * @returns {Observable<ServicePriceResponse>}
     */
    UserJobsService.prototype.getCareerFinderPrice = function () {
        var request = {
            url: "/price-services/1",
            userToken: true
        };
        return this.httpService.sendRequest(request)
            .catch(function () { return Observable.of({ price_senior: 1 }); });
    };
    UserJobsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpService])
    ], UserJobsService);
    return UserJobsService;
}());
export { UserJobsService };
