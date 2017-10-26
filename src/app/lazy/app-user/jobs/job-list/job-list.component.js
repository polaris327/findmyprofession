var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
var JobListComponent = /** @class */ (function () {
    function JobListComponent() {
        this.isCareerFinderBought = false;
        this.onFilterOptionSelected = new EventEmitter();
        this.onFileDownload = new EventEmitter();
        this.onJobChanged = new EventEmitter();
        this.onJobAdd = new EventEmitter();
        this.onJobRemove = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.onApplyStateChanged = new EventEmitter();
        this.onCoverLetterUpload = new EventEmitter();
        this.onCoverLetterRemove = new EventEmitter();
        this.onCareerFinderClicked = new EventEmitter();
        this.defaultLimit = 7;
    }
    JobListComponent.prototype.filterBy = function (option) {
        this.onFilterOptionSelected.emit(option);
    };
    JobListComponent.prototype.downloadFile = function (file) {
        this.onFileDownload.emit(file);
    };
    JobListComponent.prototype.itemStatusChanged = function (status, job, index) {
        this.onJobChanged.emit({
            status: status,
            id: job.id,
            index: index
        });
    };
    JobListComponent.prototype.addNewJob = function () {
        this.onJobAdd.emit();
    };
    JobListComponent.prototype.removeJob = function (job) {
        this.onJobRemove.emit(job);
    };
    JobListComponent.prototype.pageChanged = function (page) {
        this.onPageChange.emit(page);
    };
    JobListComponent.prototype.applyStateChanged = function (eventObject) {
        this.onApplyStateChanged.emit(eventObject);
    };
    JobListComponent.prototype.uploadCoverLetter = function (file, job, index) {
        this.onCoverLetterUpload.emit({
            file: file,
            id: job.id,
            index: index
        });
    };
    JobListComponent.prototype.removeCoverLetter = function (job, index) {
        this.onCoverLetterRemove.emit({ id: job.id, index: index });
    };
    JobListComponent.prototype.selectCareerFinder = function () {
        this.onCareerFinderClicked.emit();
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], JobListComponent.prototype, "jobs", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], JobListComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], JobListComponent.prototype, "statuses", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], JobListComponent.prototype, "jobsCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], JobListComponent.prototype, "sortList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], JobListComponent.prototype, "filterByOption", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], JobListComponent.prototype, "currentPage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], JobListComponent.prototype, "isCareerFinderBought", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobListComponent.prototype, "onFilterOptionSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobListComponent.prototype, "onFileDownload", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobListComponent.prototype, "onJobChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobListComponent.prototype, "onJobAdd", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobListComponent.prototype, "onJobRemove", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobListComponent.prototype, "onPageChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobListComponent.prototype, "onApplyStateChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobListComponent.prototype, "onCoverLetterUpload", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobListComponent.prototype, "onCoverLetterRemove", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobListComponent.prototype, "onCareerFinderClicked", void 0);
    JobListComponent = __decorate([
        Component({
            selector: 'fmp-jobs-list-component',
            templateUrl: 'job-list.html',
            styles: [require('./job-list.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], JobListComponent);
    return JobListComponent;
}());
export { JobListComponent };
