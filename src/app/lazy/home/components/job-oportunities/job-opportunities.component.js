var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
require('../../../../../assets/images/job-opportunities/amazon.jpg');
require('../../../../../assets/images/job-opportunities/bank-of-america.jpg');
require('../../../../../assets/images/job-opportunities/bed-bath.jpg');
require('../../../../../assets/images/job-opportunities/chevron.jpg');
require('../../../../../assets/images/job-opportunities/fitbit.jpg');
require('../../../../../assets/images/job-opportunities/google.jpg');
require('../../../../../assets/images/job-opportunities/indeed.jpg');
require('../../../../../assets/images/job-opportunities/kaiser.jpg');
require('../../../../../assets/images/job-opportunities/mercedes.jpg');
require('../../../../../assets/images/job-opportunities/northrop.jpg');
require('../../../../../assets/images/job-opportunities/pepsi.jpg');
require('../../../../../assets/images/job-opportunities/ups.jpg');
var HomeJobOpportunitiesComponent = /** @class */ (function () {
    function HomeJobOpportunitiesComponent() {
        this.opportunities = [
            {
                src: 'amazon',
                alt: 'Amazon',
                title: 'Amazon'
            },
            {
                src: 'bank-of-america',
                alt: 'boa',
                title: 'boa'
            },
            {
                src: 'bed-bath',
                alt: 'bedbath',
                title: 'bedbath'
            },
            {
                src: 'chevron',
                alt: 'Chevron',
                title: 'Chevron'
            },
            {
                src: 'fitbit',
                alt: 'fitbit',
                title: 'fitbit'
            },
            {
                src: 'google',
                alt: 'google',
                title: 'google'
            },
            {
                src: 'indeed',
                alt: 'indeed',
                title: 'indeed'
            },
            {
                src: 'kaiser',
                alt: 'kiser',
                title: 'kiser'
            },
            {
                src: 'mercedes',
                alt: 'mercedes',
                title: 'mercedes'
            },
            {
                src: 'northrop',
                alt: 'northrop',
                title: 'northrop'
            },
            {
                src: 'pepsi',
                alt: 'pepsico',
                title: 'pepsico'
            },
            {
                src: 'ups',
                alt: 'ups',
                title: 'ups'
            }
        ];
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HomeJobOpportunitiesComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HomeJobOpportunitiesComponent.prototype, "description", void 0);
    HomeJobOpportunitiesComponent = __decorate([
        Component({
            selector: 'fmp-job-opportunities-component',
            templateUrl: 'job-opportunities.component.html',
            styles: [require('./job-opportunities.component.scss').toString()],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], HomeJobOpportunitiesComponent);
    return HomeJobOpportunitiesComponent;
}());
export { HomeJobOpportunitiesComponent };
