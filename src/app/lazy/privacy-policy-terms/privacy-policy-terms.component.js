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
import { MetaTags } from '../../core/services/meta-tags.service';
import { Title } from '@angular/platform-browser';
require('../../../assets/images/blue-bg/privacy.jpg');
var PrivacyPolicyTermsComponent = /** @class */ (function () {
    function PrivacyPolicyTermsComponent(route, metaService, titleService) {
        this.route = route;
        this.metaService = metaService;
        this.titleService = titleService;
        this.currentTab = 'Terms of Use';
        this.subNavState = false;
        var pageContent = route.snapshot.data['pageContent'];
        if (pageContent) {
            this.titleService.setTitle(pageContent.title);
            this.metaService.setTitles(pageContent.seo_title);
            this.metaService.setDescription(pageContent.description);
            this.metaService.removeImageTags();
            this.pageContent = pageContent.content;
        }
    }
    PrivacyPolicyTermsComponent.prototype.switchTab = function (tab) {
        this.subNavState = false;
        this.currentTab = tab;
    };
    PrivacyPolicyTermsComponent.prototype.toggleSubNav = function () {
        this.subNavState = !this.subNavState;
    };
    PrivacyPolicyTermsComponent = __decorate([
        Component({
            selector: 'privacy-policy-terms-component',
            templateUrl: 'privacy-policy-terms.component.html',
            styles: [require('./privacy-policy-terms.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            MetaTags,
            Title])
    ], PrivacyPolicyTermsComponent);
    return PrivacyPolicyTermsComponent;
}());
export { PrivacyPolicyTermsComponent };
