var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
require('../../../assets/images/blue-bg/career-finder.jpg');
require('../../../assets/images/blue-bg/resume-makeover.jpg');
require('../../../assets/images/blue-bg/cover-letter-service.jpg');
require('../../../assets/images/blue-bg/linkedin-profile-makeover.jpg');
require('../../../assets/images/blue-bg/job-interview-prep.jpg');
var CoachingPackagesHolderComponent = /** @class */ (function () {
    function CoachingPackagesHolderComponent(route, router) {
        this.route = route;
        this.router = router;
        this.backImage = 'career-finder';
        this.subNavState = false;
        this.selectedPackage = 'Career Finder';
        var list = route.snapshot.data['list'];
        if (Array.isArray(list)) {
            this.coachingServices = list;
        }
        var service = list.find(function (element) { return router.url.includes(element.link); });
        if (service) {
            this.backImage = this.router.url.toString().replace('/', '');
            this.selectedService = service.name;
            this.selectedPackage = service.name;
        }
    }
    CoachingPackagesHolderComponent.prototype.selectBackImage = function (id) {
        this.backImage = id;
    };
    CoachingPackagesHolderComponent.prototype.packageSelected = function (link) {
        this.selectedPackage = link.name;
        this.selectedService = link.name;
        this.subNavState = false;
    };
    CoachingPackagesHolderComponent.prototype.toggleSubNav = function () {
        this.selectedPackage = '';
        this.subNavState = !this.subNavState;
    };
    CoachingPackagesHolderComponent.prototype.clickLink = function (event, link) {
        event.preventDefault();
        this.checkForClose(link.name);
        this.openLink(link);
    };
    CoachingPackagesHolderComponent.prototype.touchLink = function (event, link) {
        event.preventDefault();
        this.checkForClose(link.name);
        this.openLink(link);
    };
    CoachingPackagesHolderComponent.prototype.checkForClose = function (link) {
        if (this.selectedService === link) {
            this.subNavState = false;
            this.selectedPackage = link;
        }
    };
    CoachingPackagesHolderComponent.prototype.openLink = function (link) {
        var _this = this;
        Observable.fromPromise(this.router.navigate(["/" + link.link]))
            .filter(function (state) { return state; })
            .subscribe(function () { return _this.packageSelected(link); });
    };
    CoachingPackagesHolderComponent = __decorate([
        Component({
            selector: 'coaching-packages-holder-component',
            templateUrl: 'coaching-packages-holder.component.html'
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router])
    ], CoachingPackagesHolderComponent);
    return CoachingPackagesHolderComponent;
}());
export { CoachingPackagesHolderComponent };
