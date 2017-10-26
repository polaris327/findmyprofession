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
import { TestimonialsService } from './testimonials.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaTags } from '../../core/services/meta-tags.service';
import { DOMAIN_URL } from '../../../main.config';
require('../../../assets/images/logo-company.png');
var TestimonialsComponent = /** @class */ (function () {
    function TestimonialsComponent(testimonialsService, route, metaService, router) {
        this.testimonialsService = testimonialsService;
        this.route = route;
        this.metaService = metaService;
        this.router = router;
        this.currentPage = 1;
        this.defaultLimit = 8;
        this.page = 1;
        var params = route.snapshot.queryParams;
        this.currentPage = TestimonialsComponent_1.checkPage(params);
        var pageData = route.snapshot.data['pageData'];
        if (pageData) {
            this.content = pageData.content;
            this.metaService.setMetaTags(pageData);
            this.metaService.setImages(DOMAIN_URL + "/src/assets/images/logo-company.png");
            this.setTestimonials(pageData.testimonials);
        }
    }
    TestimonialsComponent_1 = TestimonialsComponent;
    TestimonialsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams
            .subscribe(function (params) {
            var page = TestimonialsComponent_1.checkPage(params);
            if (_this.page !== page) {
                _this.testimonialsService.getTestimonials({ page: page })
                    .subscribe(function (response) {
                    if (response) {
                        _this.page = page;
                        _this.setTestimonials(response.testimonials);
                    }
                });
            }
        });
    };
    TestimonialsComponent.prototype.pageSelected = function () {
        this.router.navigate(['/testimonials'], { queryParams: { page: this.currentPage } });
    };
    TestimonialsComponent.prototype.setTestimonials = function (testimonials) {
        if (testimonials) {
            this.items = testimonials.testimonials;
            this.collectionSize = testimonials.count * this.defaultLimit;
        }
    };
    TestimonialsComponent.checkPage = function (params) {
        if (params && Number.isInteger(+params.page)) {
            return +params.page;
        }
        return 1;
    };
    TestimonialsComponent = TestimonialsComponent_1 = __decorate([
        Component({
            selector: 'testimonials-component',
            templateUrl: 'testimonials.component.html',
            styles: [require('./testimonials.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [TestimonialsService,
            ActivatedRoute,
            MetaTags,
            Router])
    ], TestimonialsComponent);
    return TestimonialsComponent;
    var TestimonialsComponent_1;
}());
export { TestimonialsComponent };
