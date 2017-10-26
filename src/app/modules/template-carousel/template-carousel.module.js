var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateCarousel } from './template-carousel.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { TestimonialsMinHolderComponent } from './testimonial-min-holder/testimonial-min-holder.component';
import { RatingStarsModule } from '../rating-stars/rating-stars.module';
import { CareerAdviceSliderItemComponent } from './career-advice-slider-item/career-advice-slider-item.component';
import { TruncateModule } from 'ng2-truncate';
import { LikeIconModule } from '../like-icon/like-icon.module';
import { CustomLinkModule } from '../custom-link/custom-link.module';
import { SharedModule } from '../../shared/shared.module';
var TemplateCarouselModule = /** @class */ (function () {
    function TemplateCarouselModule() {
    }
    TemplateCarouselModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule,
                RatingStarsModule,
                TruncateModule,
                LikeIconModule,
                CustomLinkModule,
                SharedModule
            ],
            declarations: [
                TemplateCarousel,
                HomeCarouselComponent,
                TestimonialsMinHolderComponent,
                CareerAdviceSliderItemComponent
            ],
            exports: [
                TemplateCarousel
            ],
        })
    ], TemplateCarouselModule);
    return TemplateCarouselModule;
}());
export { TemplateCarouselModule };
