var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CANCEL_STATUS, COMPLETED_STATUS } from './user-schedule.model';
import { UserScheduleService } from './user-schedule.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendlyComponent } from '../../../modules/calendly/calendly.component';
import { AlertModalComponent } from '../../../modules/alert-modal/alert-modal.component';
import { UserService } from '../../../core/services/user.service';
import { MetaTags } from '../../../core/services/meta-tags.service';
var UserScheduleComponent = /** @class */ (function () {
    function UserScheduleComponent(route, scheduleService, modalService, metaService, userService) {
        this.route = route;
        this.scheduleService = scheduleService;
        this.modalService = modalService;
        this.metaService = metaService;
        this.userService = userService;
        this.linksMap = {
            'resume-makeover': {
                'executive': 'resume-makeover-executive',
                'senior': 'resume-makeover-senior'
            },
            'cover-letter-service': {
                'executive': 'cover-letter-writing-executive',
                'senior': 'cover-letter-writing-senior'
            },
            'linkedin-profile-makeover': {
                'executive': 'linkedin-profile-makeover-executive',
                'senior': 'linkedin-profile-makeover-senior'
            },
            'job-interview-prep': {
                'executive': 'interview-training-executive',
                'senior': 'interview-training-senior'
            },
            'career-finder': {
                'plan': 'career-finder-intro-1'
            }
        };
        this.metaService.setTitle('My Schedule - Find My Profession');
        this.metaService.removeAllMetaTags();
        var calls = route.snapshot.data['content'];
        this.setCalls(calls);
    }
    /**
     * Method to Cancel call
     * @param event
     * @param type
     * @param index
     */
    UserScheduleComponent.prototype.cancelEvent = function (event, type, index) {
        if (event && event.id) {
            this.openModal("Are you sure you want to cancel " + event.link + " event?", this.cancelEventRequest.bind(this, {
                id: event.id,
                index: index,
                type: type
            }));
        }
    };
    /**
     * Method to Complete call
     * @param event
     * @param type
     * @param index
     */
    UserScheduleComponent.prototype.completeEvent = function (event, type, index) {
        if (event && event.id) {
            this.openModal("Are you sure you want to mark " + event.link + " complete?", this.completeEventRequest.bind(this, {
                id: event.id,
                index: index,
                type: type
            }));
        }
    };
    /**
     * Method to open modal with selected service
     * @param event
     */
    UserScheduleComponent.prototype.scheduleEventCall = function (event) {
        var _this = this;
        var modal = this.modalService.open(CalendlyComponent);
        modal.componentInstance.type = event.calendlyLink;
        modal.result.then(function () { return _this.reloadCalls(); }, function () { return _this.reloadCalls(); });
    };
    /**
     * Method to refresh calls
     */
    UserScheduleComponent.prototype.reloadCalls = function () {
        var _this = this;
        this.scheduleService.getCalls()
            .subscribe((function (calls) { return _this.setCalls(calls); }));
    };
    /**
     * Method to send Http request with complete event
     * @param args
     */
    UserScheduleComponent.prototype.completeEventRequest = function (args) {
        var _this = this;
        this.scheduleService.changeEventStatus(args.id, COMPLETED_STATUS)
            .subscribe(function () { return _this.reloadCalls(); }, function (error) { return _this._handleError(error); });
    };
    /**
     * Method to send Http request with cancel event
     * @param args
     */
    UserScheduleComponent.prototype.cancelEventRequest = function (args) {
        var _this = this;
        this.scheduleService.changeEventStatus(args.id, CANCEL_STATUS)
            .subscribe(function () { return _this.reloadCalls(); }, function (error) { return _this._handleError(error); });
    };
    /**
     * Method to open modal and trigger callback
     * @param message
     * @param callback
     */
    UserScheduleComponent.prototype.openModal = function (message, callback) {
        var modal = this.modalService.open(AlertModalComponent, {
            backdrop: false
        });
        modal.result.then(function () {
            callback();
        }, function () {
            /*Canceled*/
        });
        modal.componentInstance.message = message;
    };
    UserScheduleComponent.prototype.setCalls = function (calls) {
        var _this = this;
        if (calls && Array.isArray(calls.available)) {
            var user = this.userService.user$.getValue();
            if (!this.userPackagesMap) {
                this.userPackagesMap = new Map();
                user.packages.forEach(function (element) {
                    _this.userPackagesMap.set(element.service.id, element);
                });
            }
            calls.available.forEach(function (element) {
                var packageItem = _this.userPackagesMap.get(element.id);
                if (_this.linksMap[element.link]) {
                    if (element.link === 'career-finder') {
                        element.calendlyLink = _this.linksMap[element.link].plan;
                    }
                    else {
                        element.calendlyLink = _this.linksMap[element.link][packageItem.plan.toLowerCase()];
                        console.log('link: ', element.calendlyLink);
                    }
                }
            });
        }
        this.calls = calls;
    };
    /**
     * Method to handle http error
     * @param e
     * @private
     */
    UserScheduleComponent.prototype._handleError = function (e) {
        this.errorMessage = e.message;
    };
    UserScheduleComponent = __decorate([
        Component({
            selector: 'fmp-my-schedule-component',
            templateUrl: 'user-schedule.html',
            styles: [require('./user-schedule.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            UserScheduleService,
            NgbModal,
            MetaTags,
            UserService])
    ], UserScheduleComponent);
    return UserScheduleComponent;
}());
export { UserScheduleComponent };
