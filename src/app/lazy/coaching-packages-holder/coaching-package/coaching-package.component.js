var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaTags } from '../../../core/services/meta-tags.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../../core/services/basket.service';
import { CalendlyComponent } from '../../../modules/calendly/calendly.component';
import { PaymentService } from '../../../core/services/payment.service';
import { ResizeModeService } from '../../../core/services/resize-mode.service';
import { MODE_MOB } from '../../../core/models/core.model';
import { TestimonialModalComponent } from '../../../modules/testimonial-modal/testimonial-modal.component';
import { Subject } from 'rxjs/Subject';
require('../../../../assets/images/sprite.svg');
require('../../../../assets/images/sprite2.svg');
var CoachingPackageComponent = (function () {
    function CoachingPackageComponent(route, metaTagsService, basketService, router, modalService, paymentService, resizeModeService) {
        this.route = route;
        this.metaTagsService = metaTagsService;
        this.basketService = basketService;
        this.router = router;
        this.modalService = modalService;
        this.paymentService = paymentService;
        this.resizeModeService = resizeModeService;
        this.packageId = 0;
        /**
         * Truncate pipe settings
         * @type {number}
         */
        this.defaultTuncateValue = 500;
        this.isTruncateOpen = false;
        this.isMobileMode = false;
        this.basket = {
            senior: false,
            executive: false
        };
        this.destroyed$ = new Subject();
        this.setContent(route);
        this.subscribeToBasket();
        this.createResizeSub();
    }
    CoachingPackageComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    CoachingPackageComponent.prototype.toggleTruncate = function () {
        this.isTruncateOpen = !this.isTruncateOpen;
        if (this.isTruncateOpen) {
            this.currentTruncateLimit = this.bodyLength;
        }
        else {
            this.currentTruncateLimit = this.defaultTuncateValue;
            this.articleElement.nativeElement.scrollIntoView(true);
        }
    };
    CoachingPackageComponent.prototype.packageBuy = function (item) {
        item.title = this.page.title;
        item.icon = this.page.link;
        this.basketService.addNewItem(item);
        this.paymentService.updatePayment();
        this.router.navigate(['/checkout']);
    };
    CoachingPackageComponent.prototype.subscribeToBasket = function () {
        var _this = this;
        this.basketService.basket$
            .takeUntil(this.destroyed$)
            .subscribe(function (basket) {
            return basket
                .filter(function (item) { return item.id === _this.packageId; })
                .forEach(function (item) { return _this.basket[item.plan.toLowerCase()] = true; });
        });
    };
    CoachingPackageComponent.prototype.openCalendly = function () {
        var modal = this.modalService.open(CalendlyComponent, {
            size: 'lg'
        });
        modal.componentInstance.type = 'career-finder-intro';
    };
    CoachingPackageComponent.prototype.openTestimonialModal = function ($testimonial) {
        var modal = this.modalService.open(TestimonialModalComponent);
        modal.componentInstance.testimonial = $testimonial;
    };
    CoachingPackageComponent.prototype.createResizeSub = function () {
        var _this = this;
        this.resizeModeService.mode$
            .takeUntil(this.destroyed$)
            .subscribe(function (mode) { return _this.handleResizeEvent(mode); });
    };
    CoachingPackageComponent.prototype.handleResizeEvent = function (mode) {
        this.isMobileMode = (mode === MODE_MOB);
        if (this.isMobileMode) {
            this.isTruncateOpen = false;
            this.currentTruncateLimit = this.defaultTuncateValue;
        }
        else {
            this.isTruncateOpen = true;
            this.currentTruncateLimit = this.bodyLength;
        }
    };
    CoachingPackageComponent.prototype.setContent = function (route) {
        if (route.snapshot.data) {
            var data = route.snapshot.data.pageData;
            //data.content.slider.slider_header_description = "Schedule a call and learn how we find your next job";
            this.page = data;
            if (data) {
                this.content = data.content;
                if (data.content.packages) {
                    this.packageId = data.content.packages.id;
                }
                else {
                    this.packageId = 1;
                }
                this.metaTagsService.setTitle(data.title);
                this.metaTagsService.setTitles(data.seo_title);
                this.metaTagsService.setDescription(data.description);
                this.metaTagsService.removeImageTags();
                if (data.content.body) {
                    this.bodyLength = data.content.body.toString().length;
                }
            }
        }
    };
    return CoachingPackageComponent;
}());
__decorate([
    ViewChild('article'),
    __metadata("design:type", ElementRef)
], CoachingPackageComponent.prototype, "articleElement", void 0);
CoachingPackageComponent = __decorate([
    Component({
        selector: 'coaching-package-component',
        templateUrl: 'coaching-package.component.html',
        styles: [require('./coaching-package.component.scss').toString()],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        MetaTags,
        BasketService,
        Router,
        NgbModal,
        PaymentService,
        ResizeModeService])
], CoachingPackageComponent);
export { CoachingPackageComponent };
