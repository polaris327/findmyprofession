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
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MetaTags } from '../../core/services/meta-tags.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendlyComponent } from '../../modules/calendly/calendly.component';
import { PlatformCheckService } from '../../core/services/platform-check.service';
import { DOMAIN_URL } from '../../../main.config';
require('../../../assets/images/meta-logo-icon.png');
require('../../../assets/images/logo-og.png');
var HomeComponent = (function () {
    function HomeComponent(route, titleService, metaTagsService, modalService, router, platformCheckService) {
        this.route = route;
        this.titleService = titleService;
        this.metaTagsService = metaTagsService;
        this.modalService = modalService;
        this.router = router;
        this.platformCheckService = platformCheckService;
        this.content = null;
        this.componentLoaded = false;
        if (route.snapshot.data) {
            this.setSnapshotData((route.snapshot.data['pageData']));
        }
    }
    HomeComponent.prototype.ngOnInit = function () {
        if (this.platformCheckService.isBrowser) {
            this.componentLoaded = true;
        }
    };
    HomeComponent.prototype.openCalendly = function () {
        var modal = this.modalService.open(CalendlyComponent, {
            size: 'lg'
        });
        if (modal) {
            modal.componentInstance.type = 'career-finder-intro';
        }
    };
    HomeComponent.prototype.openCareerFinder = function () {
        this.router.navigate(['/career-finder']);
    };
    /**
     * Method to set incoming data to local variables
     * @param {HomePage.IHomePage} data
     */
    HomeComponent.prototype.setSnapshotData = function (data) {
        this.content = data.content;
        this.content.slider_header_description = "Schedule a call and learn how we find your next job";
        this.titleService.setTitle(data.seo_title);
        this.metaTagsService.setTitles(data.seo_title);
        this.metaTagsService.setDescription(data.description);
        this.metaTagsService.setImages(DOMAIN_URL + "/src/assets/images/logo-og.png");
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Component({
        selector: 'fmp-home-component',
        templateUrl: 'home.component.html',
        styles: [require('./home.component.scss').toString()],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Title,
        MetaTags,
        NgbModal,
        Router,
        PlatformCheckService])
], HomeComponent);
export { HomeComponent };
