var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
import { PlatformCheckService } from '../../core/services/platform-check.service';
import { TemplateCarouselSpace } from './career-advice-slider-item/template-carousel.model';
var TYPE_HOME = TemplateCarouselSpace.TYPE_HOME;
var TYPE_ADVICE = TemplateCarouselSpace.TYPE_ADVICE;
var TYPE_SERVICE = TemplateCarouselSpace.TYPE_SERVICE;
import { MODE_DESK, MODE_MOB } from '../../core/models/core.model';
import { Router } from '@angular/router';
var TemplateCarousel = /** @class */ (function () {
    function TemplateCarousel(changeDetector, platformService, router) {
        this.changeDetector = changeDetector;
        this.platformService = platformService;
        this.router = router;
        this.slidesNumber = 6;
        this.transitionTime = 2000;
        this.onLikeToggle = new EventEmitter();
        this.onTestimonialOpen = new EventEmitter();
        this.openArticle = new EventEmitter();
        this.mode = MODE_MOB;
        this.wrapWidth = null;
        this.defaultWrapWidth = 1088;
        this.marginLeft = 0;
        this.currentStart = 0;
        this.needTransition = false;
        this.mediaPoint = 1025;
        this.currentSlideNumber = 1;
        /**
         * Represent state of current carousel transition state , if now there's transition action
         * @type {boolean}
         */
        this.isNowTransition = false;
    }
    TemplateCarousel.prototype.ngOnChanges = function (changes) {
        var itemsChange = changes['sliderItems'];
        if (itemsChange && itemsChange.currentValue) {
            this.onResize();
            this.setInnerItems(this.sliderItems);
            if (this.mode !== MODE_MOB) {
                this.currentStart = -1;
                this.marginLeft = -1 * (this.wrapWidth || this.defaultWrapWidth);
            }
            this.getCurrentPage();
            this.changeDetector.detectChanges();
        }
    };
    TemplateCarousel.prototype.ngAfterViewInit = function () {
        if (this.platformService.isBrowser) {
            this.onResize();
        }
    };
    TemplateCarousel.prototype.ngOnDestroy = function () {
        this.changeDetector.detach();
    };
    TemplateCarousel.prototype.toggleLike = function ($state, item) {
        var callBack = function (item, state) {
            item.liked = state;
        };
        var revert = function (item, state) {
            if (item.liked === state) {
                item.liked = !state;
            }
        };
        this.onLikeToggle.emit({
            state: $state,
            id: item.id,
            callback: callBack.bind(this, item, $state),
            revertCallback: revert.bind(this, item, $state)
        });
    };
    TemplateCarousel.prototype.openCareerAdviceArticle = function ($event) {
        this.openArticle.emit($event);
    };
    TemplateCarousel.prototype.goLeft = function () {
        var _this = this;
        this.transitionStart();
        this.marginLeft += this.wrapWidth;
        this.currentStart++;
        this.enableTransition();
        this.getCurrentPage();
        if (this.mode === MODE_DESK) {
            if (this.currentStart === 0) {
                this.executeTimeout(function () {
                    _this.disableTransition();
                    _this.currentStart = -1 * _this.slidesNumber;
                    _this.marginLeft = _this.wrapWidth * -1 * _this.slidesNumber;
                });
            }
        }
        else {
            if (this.currentStart === 0) {
                this.executeTimeout(function () {
                    _this.disableTransition();
                    _this.currentStart = -1 * _this.slidesNumber;
                    _this.marginLeft = _this.wrapWidth * -1 * _this.slidesNumber;
                    _this.getCurrentPage();
                });
            }
        }
    };
    TemplateCarousel.prototype.goRight = function () {
        this.transitionStart();
        this.currentStart--;
        this.marginLeft -= this.wrapWidth;
        this.enableTransition();
        this.getCurrentPage();
        if (this.mode === MODE_DESK) {
            if (this.currentStart === -1 * (this.slidesNumber + 1)) {
                this.gotRightTimeout();
            }
        }
        else {
            if (this.currentStart + 1 === (-1 * this.slidesNumber)) {
                this.gotRightTimeout();
            }
        }
    };
    TemplateCarousel.prototype.gotRightTimeout = function () {
        var _this = this;
        this.executeTimeout(function () {
            _this.disableTransition();
            _this.currentStart = -1;
            _this.calculateMargin();
        });
    };
    TemplateCarousel.prototype.onResize = function () {
        if (this.platformService.isBrowser) {
            var oldValue = this.needTransition;
            this.needTransition = false;
            var width = window.innerWidth;
            if (width > 1320) {
                this.wrapWidth = this.defaultWrapWidth;
            }
            else if (width > 1024) {
                this.wrapWidth = (width - 116 * 2);
            }
            else {
                this.wrapWidth = width;
            }
            if (width >= this.mediaPoint) {
                this.mode = MODE_DESK;
            }
            else {
                this.mode = MODE_MOB;
            }
            if (this.type === TYPE_ADVICE) {
                if (width <= 1340) {
                    this.wrapWidth = width - 20;
                }
                if (width >= 1341) {
                    this.wrapWidth = 1320;
                }
            }
            this.calculateMargin();
            this.needTransition = oldValue;
            this.changeDetector.detectChanges();
        }
    };
    /**
     * Method to open selected testimonial
     * @param $testimonial
     */
    TemplateCarousel.prototype.openExistTestimonial = function ($testimonial) {
        this.onTestimonialOpen.emit($testimonial);
    };
    TemplateCarousel.prototype.calculateMargin = function () {
        this.marginLeft = -1 * (this.wrapWidth || this.defaultWrapWidth);
    };
    /**
     * Method to detect start and stop of transition
     */
    TemplateCarousel.prototype.transitionStart = function () {
        var _this = this;
        this.executeTimeout(function () { return _this.isNowTransition = false; }, function () { return _this.isNowTransition = true; });
    };
    /**
     * Method to recalculate current slide number
     */
    TemplateCarousel.prototype.getCurrentPage = function () {
        var abs = Math.abs(this.currentStart);
        if (abs > this.slidesNumber) {
            abs = 1;
        }
        else if (abs === 0) {
            abs = this.slidesNumber;
        }
        this.currentSlideNumber = abs;
    };
    /**
     *
     * @param innerCallback
     * @param beforeCallback
     */
    TemplateCarousel.prototype.executeTimeout = function (innerCallback, beforeCallback) {
        if (beforeCallback) {
            beforeCallback();
        }
        setTimeout(function () {
            if (innerCallback) {
                innerCallback();
            }
        }, this.transitionTime);
    };
    /**
     * Method to set local items
     * @param items
     */
    TemplateCarousel.prototype.setInnerItems = function (items) {
        if (items === void 0) { items = []; }
        if (this.type !== TYPE_HOME && items.length % 2 !== 0 && items.length > 4) {
            items = items.slice(0, items.length - 1).slice();
            this.slidesNumber = items.length / 2;
        }
        var length = items.length;
        if (this.type === TYPE_HOME) {
            this.slides = [
                items[length - 1]
            ].concat(items, [
                items[0]
            ]);
        }
        else if (this.type === TYPE_SERVICE) {
            this.slides = [
                items[length - 2],
                items[length - 1]
            ].concat(items, items.slice(0, 2));
        }
        else if (this.type === TYPE_ADVICE) {
            if (this.mode === MODE_DESK) {
                this.slides = [
                    items[length - 2],
                    items[length - 1]
                ].concat(items, items.slice(0, 2));
            }
            else {
                this.slides = [
                    items[length - 1]
                ].concat(items, [
                    items[0]
                ]);
                this.slidesNumber = length;
                this.currentStart = -1;
            }
        }
        this.slides.forEach(function (slide, index) { return slide.index = index; });
    };
    TemplateCarousel.prototype.disableTransition = function () {
        this.needTransition = false;
    };
    TemplateCarousel.prototype.enableTransition = function () {
        this.needTransition = true;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TemplateCarousel.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TemplateCarousel.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TemplateCarousel.prototype, "subTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TemplateCarousel.prototype, "sliderItems", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TemplateCarousel.prototype, "slidesNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TemplateCarousel.prototype, "transitionTime", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TemplateCarousel.prototype, "onLikeToggle", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TemplateCarousel.prototype, "onTestimonialOpen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TemplateCarousel.prototype, "openArticle", void 0);
    __decorate([
        HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TemplateCarousel.prototype, "onResize", null);
    TemplateCarousel = __decorate([
        Component({
            selector: 'fmp-template-carousel-component',
            templateUrl: 'template-carousel.component.html',
            styles: [require('./template-carousel.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            PlatformCheckService,
            Router])
    ], TemplateCarousel);
    return TemplateCarousel;
}());
export { TemplateCarousel };
