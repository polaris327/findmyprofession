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
var CareerAdviceTabsComponent = /** @class */ (function () {
    function CareerAdviceTabsComponent() {
        this.isTop = false;
        this.articleCategories = [
            {
                title: 'All Articles',
                link: 'career-advice'
            },
            {
                title: 'LinkedIn',
                link: 'linkedin'
            },
            {
                title: 'Resume + Cover Letter',
                link: 'resume-cover-letter'
            },
            {
                title: 'Interviewing',
                link: 'interviewing'
            },
            {
                title: 'Job Search',
                link: 'job-search'
            }
        ];
        this.onLinkClick = new EventEmitter();
        this.onMenuOpen = new EventEmitter();
        this.subNavState = false;
    }
    CareerAdviceTabsComponent.prototype.ngAfterViewInit = function () {
        /**
         * Setting selected package if not exist
         */
        if (this.articleCategories && !this.selectedPackage && this.articleCategories[2]) {
            this.selectedPackage = this.articleCategories[2].link;
        }
    };
    CareerAdviceTabsComponent.prototype.toggleSubNav = function () {
        this.subNavState = !this.subNavState;
        this.moveContent();
    };
    CareerAdviceTabsComponent.prototype.openLink = function ($event, link) {
        $event.preventDefault();
        this.selectedPackage = link.title;
        this.onLinkClick.emit(link.link);
    };
    CareerAdviceTabsComponent.prototype.packageSelected = function (link) {
        this.selectedPackage = link;
        this.subNavState = false;
        if (this.selectedPackage === link) {
            this.subNavState = false;
            this.onMenuOpen.emit(this.subNavState);
        }
        else {
            this.subNavState = true;
        }
    };
    CareerAdviceTabsComponent.prototype.moveContent = function () {
        this.onMenuOpen.emit(this.subNavState);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CareerAdviceTabsComponent.prototype, "isTop", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CareerAdviceTabsComponent.prototype, "articleCategories", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CareerAdviceTabsComponent.prototype, "selectedPackage", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CareerAdviceTabsComponent.prototype, "onLinkClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CareerAdviceTabsComponent.prototype, "onMenuOpen", void 0);
    CareerAdviceTabsComponent = __decorate([
        Component({
            selector: 'fmp-career-advice-tabs',
            templateUrl: 'career-advice-tabs.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], CareerAdviceTabsComponent);
    return CareerAdviceTabsComponent;
}());
export { CareerAdviceTabsComponent };
