var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserJobsService } from './user-jobs.service';
import { SORT_OPTIONS, STATUSES } from './user-jobs.model';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { FmpAddJobComponent } from './job-add-modal/job-add-modal.component';
import { AlertModalComponent } from '../../../modules/alert-modal/alert-modal.component';
import { CoreUtilitiesService } from '../../../core/services/core-utilities.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../core/services/user.service';
import { CareerFinderStepsModalComponent } from '../../../modules/career-finder-steps-modal/career-finder-steps-modal.component';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
var UserJobsComponent = (function () {
    function UserJobsComponent(jobsService, route, router, changeDetector, modalService, userService, titleService) {
        this.jobsService = jobsService;
        this.route = route;
        this.router = router;
        this.changeDetector = changeDetector;
        this.modalService = modalService;
        this.userService = userService;
        this.titleService = titleService;
        this.jobs = {
            liked: [],
            applied: []
        };
        this.jobsCount = {
            liked: 0,
            applied: 0
        };
        this.jobsCurrentPage = {
            liked: 0,
            applied: 0
        };
        this.filterOption = {
            liked: null,
            applied: null
        };
        this.statuses = {
            liked: [],
            applied: []
        };
        this.likedSortList = [];
        this.appliedSortList = [];
        this.likedStatus = 'liked';
        this.appliedStatus = 'applied';
        this.defaultCategory = this.likedStatus;
        this.defaultPage = 1;
        this.destroyed$ = new Subject();
        /**
         * Represent if current user bought Career Finder package
         * @type {boolean}
         */
        this.isCareerFinderBought = false;
        this.titleService.setTitle('My Jobs - Find My Profession');
        var price = this.route.snapshot.data['price'];
        if (price) {
            this.careerFinderPrice = price.price_senior;
        }
        this.statuses = STATUSES;
        this.sortList = SORT_OPTIONS;
        this.likedSortList = this.sortList.liked.map(function (element) { return element.title; });
        this.appliedSortList = this.sortList.applied.map(function (element) { return element.title; });
        this.subscribeToUser();
    }
    UserJobsComponent.prototype.ngOnInit = function () {
        this.watchForQueryParams();
    };
    UserJobsComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.changeDetector.detach();
    };
    /**
     * Method to change status of the job
     * @param entity
     * @param category
     */
    UserJobsComponent.prototype.jobStatusChanged = function (entity, category) {
        var _this = this;
        if (entity.status.currentValue === 'Ready' && !this.isCareerFinderBought) {
            this.openCareerFinderModal();
            /**
             * Reverting changes to previjob-ous
             * @type {string}
             */
            this.jobs[category][entity.index].status = entity.status.previousValue;
            entity.status.callback();
        }
        else if (entity.status.currentValue === 'Not Interested' && this.jobs[category][entity.index].added_by === 'user') {
            /**
             * Reverting changes to previjob-ous
             * @type {string}
             */
            this.jobs[category][entity.index].status = entity.status.previousValue;
            entity.status.callback();
        }
        else {
            var currentPage_1 = this.getCurrentPage(this.getQueryParams());
            this.jobsService.setJobStatus(entity.id, entity.status.currentValue, currentPage_1)
                .subscribe(function (response) { return _this.setLoadedJobs(response, category, currentPage_1); }, this.handleError.bind(this));
        }
    };
    /**
     * Open modal to add new job
     */
    UserJobsComponent.prototype.createNewJob = function () {
        var _this = this;
        var modal = this.modalService.open(FmpAddJobComponent);
        Observable.fromPromise(modal.result)
            .flatMap(function (job) { return _this.jobsService.addJob(job); })
            .subscribe(function (response) { return _this.setLoadedJobs(response, _this.likedStatus); }, this.handleError.bind(this));
    };
    /**
     * Remove job from list with confirmation
     * @param job
     */
    UserJobsComponent.prototype.removeJobEntity = function (job) {
        var _this = this;
        var modal = this.modalService.open(AlertModalComponent);
        modal.componentInstance.message = "Are you sure you want to remove the job (" + job.position + ")?";
        Observable.fromPromise(modal.result)
            .flatMap(function () { return _this.jobsService.removeJob(job.id); })
            .subscribe(function (response) { return _this.setLoadedJobs(response, _this.getQueryParams().category); }, this.handleError.bind(this));
    };
    /**
     * Method that triggers when user change tab
     * @param event
     */
    UserJobsComponent.prototype.onTabChanged = function (event) {
        if (this.getCategory(this.route.snapshot.queryParams) !== event.nextId) {
            this.setQueryParams(event.nextId, 1);
        }
    };
    UserJobsComponent.prototype.onFilterOptionChanged = function (list, option) {
        this.setQueryParams(list, 1, this.getSortPipeOption(list, option, 'value'));
    };
    /**
     * Method to download file from job
     * @param event
     */
    UserJobsComponent.prototype.downloadFile = function (event) {
        this.jobsService.downloadFile(event.link)
            .subscribe(function (data) { return CoreUtilitiesService.saveFile(data, event.fileName); }, this.handleError.bind(this));
    };
    /**
     * Method that triggers when user change page
     * @param page
     */
    UserJobsComponent.prototype.currentPageChanged = function (page) {
        var queryParams = this.getQueryParams();
        this.setQueryParams(queryParams.category, page, queryParams.filter);
    };
    /**
     * Method to apply job (checkbox)
     * @param eventObject
     */
    UserJobsComponent.prototype.applyStatusChanged = function (eventObject) {
        var _this = this;
        if (this.isCareerFinderBought) {
            var params = this.getQueryParams();
            var page_1 = this.getCurrentPage(params);
            var category_1 = this.getCategory(params);
            this.jobsService.changeApplyStatus(eventObject.id, eventObject.state, page_1)
                .subscribe(function (response) { return _this.setLoadedJobs(response, category_1, page_1); }, function (error) { return _this.applyStatusCatch(eventObject); });
        }
        else {
            this.applyStatusCatch(eventObject);
        }
    };
    /**
     * Method to revert changes in checkbox
     * @param eventObject
     */
    UserJobsComponent.prototype.applyStatusCatch = function (eventObject) {
        eventObject.event.preventDefault();
        var inputElement = eventObject.event.target;
        if (inputElement) {
            inputElement.checked = !eventObject.state;
        }
        eventObject.item.checked = !eventObject.state;
        this.openCareerFinderModal();
    };
    UserJobsComponent.prototype.uploadCoverLetter = function (event, type) {
        var _this = this;
        this.jobsService.uploadCoverLetter(event.file, event.id)
            .subscribe(function (responseEntity) { return _this.jobs[type][event.index] = responseEntity; });
    };
    UserJobsComponent.prototype.removeCoverLetter = function (event, type) {
        var _this = this;
        var modal = this.modalService.open(AlertModalComponent);
        modal.componentInstance.message = "Are you sure remove cover letter for selected job?";
        Observable.fromPromise(modal.result)
            .filter(function () { return !!_this.jobs[type][event.index]; })
            .flatMap(function () { return _this.jobsService.removeCoverLetter(event.id); })
            .subscribe(function () { return _this.removeCoverLetterHandler(event, type); });
    };
    UserJobsComponent.prototype.openCareerFinderModal = function (isFull) {
        if (isFull === void 0) { isFull = true; }
        var modalRef = this.modalService.open(CareerFinderStepsModalComponent, {
            size: 'lg'
        });
        modalRef.componentInstance.price = this.careerFinderPrice;
        if (!isFull) {
            modalRef.componentInstance.step = 1;
        }
    };
    UserJobsComponent.prototype.removeCoverLetterHandler = function (event, type) {
        var entity = this.jobs[type][event.index];
        entity.attachment_name = null;
        entity.attachment = null;
    };
    /**
     * Method to load new jobs
     * @param type
     * @param page
     * @param option
     */
    UserJobsComponent.prototype.loadJobs = function (type, page, option) {
        var _this = this;
        if (type === void 0) { type = this.defaultCategory; }
        if (page === void 0) { page = this.defaultPage; }
        if (option) {
            option = this.getSortPipeOption(type, option, 'title');
        }
        this.jobsService.getJobs(type, page, option)
            .subscribe(function (response) { return _this.setLoadedJobs(response, type, page, option); }, this.handleError.bind(this));
    };
    /**
     * Method to set list of jobs
     * @param response
     * @param type
     * @param currentPage
     */
    UserJobsComponent.prototype.setLoadedJobs = function (response, type, currentPage, option) {
        if (currentPage === void 0) { currentPage = this.defaultPage; }
        this.jobs[type || this.defaultCategory] = response.jobs;
        this.jobsCount[type || this.defaultCategory] = response.count || 0;
        this.jobsCurrentPage[type || this.defaultCategory] = currentPage;
        this.filterOption[type || this.defaultCategory] = option;
        this.changeDetector.detectChanges();
    };
    /**
     * Method to get current page from params
     * @param params
     * @returns {number}
     */
    UserJobsComponent.prototype.getCurrentPage = function (params) {
        var page = params.page;
        if (!Number.isNaN(+page)) {
            return +page;
        }
        return 1;
    };
    /**
     * Method to get current category from params
     * @param params
     * @returns {string}
     */
    UserJobsComponent.prototype.getCategory = function (params) {
        var category = params.category;
        if (!category) {
            return this.defaultCategory;
        }
        if (category !== this.defaultCategory && category !== this.appliedStatus) {
            return this.defaultCategory;
        }
        return category;
    };
    /**
     * Method to navigate with query params
     * @param category
     * @param page
     * @param filter
     */
    UserJobsComponent.prototype.setQueryParams = function (category, page, filter) {
        this.router.navigate(['/my-jobs'], {
            queryParams: {
                category: category,
                page: page || 1,
                filter: filter
            }
        });
    };
    /**
     * Method watch for query params
     */
    UserJobsComponent.prototype.watchForQueryParams = function () {
        var _this = this;
        this.route.queryParams
            .do(function (params) {
            if (!params.category || !params.page) {
                _this.setQueryParams(_this.getCategory(params), _this.getCurrentPage(params));
            }
        })
            .filter(function (params) { return !!params.category && !!params.page; })
            .subscribe(function (params) { return _this.queryParamsChanged(params); });
    };
    /**
     * method that triggers when query params changed
     * @param params
     */
    UserJobsComponent.prototype.queryParamsChanged = function (params) {
        this.changeDetector.detectChanges();
        this.jobsTabSet.select(params.category);
        this.loadJobs(params.category, this.getCurrentPage(params), params.filter);
    };
    /**
     * method to parse sort option with pipe
     * @param type
     * @param option
     * @param field
     * @returns {any}
     */
    UserJobsComponent.prototype.getSortPipeOption = function (type, option, field) {
        var searchField = 'value';
        if (field === searchField) {
            searchField = 'title';
        }
        var pipe = this.sortList[type].filter(function (element) { return element[searchField] === option; })[0];
        if (pipe) {
            return pipe[field];
        }
        return null;
    };
    /**
     * Method to get page query params object
     * @returns {IJobQueryParams}
     */
    UserJobsComponent.prototype.getQueryParams = function () {
        return this.route.snapshot.queryParams;
    };
    /**
     * Method to subscribe to user stream
     */
    UserJobsComponent.prototype.subscribeToUser = function () {
        var _this = this;
        this.userService.user$
            .takeUntil(this.destroyed$)
            .filter(function (user) { return !!user; })
            .subscribe(function (user) {
            _this.user = user;
            _this.isCareerFinderBought = _this.userService.checkIfCareerFinderBought();
        });
    };
    /**
     * Method to handle server error
     * @param error
     */
    UserJobsComponent.prototype.handleError = function (error) {
        this.errorMessage = error.message;
    };
    return UserJobsComponent;
}());
__decorate([
    ViewChild('jobsTabSet'),
    __metadata("design:type", NgbTabset)
], UserJobsComponent.prototype, "jobsTabSet", void 0);
UserJobsComponent = __decorate([
    Component({
        selector: 'fmp-user-jobs-layout',
        templateUrl: 'user-jobs.html'
    }),
    __metadata("design:paramtypes", [UserJobsService,
        ActivatedRoute,
        Router,
        ChangeDetectorRef,
        NgbModal,
        UserService,
        Title])
], UserJobsComponent);
export { UserJobsComponent };
