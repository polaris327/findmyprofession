var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmpPlansModule } from '../../../modules/fmp-plans/fmp-plans.module';
import { CoachingPackageComponent } from './coaching-package.component';
import { CoachingPackageRoutingModule } from './coaching-package-routing.module';
import { CoachingPackageResolver } from './coaching-package.resolver';
import { CareerFinderSliderModule } from '../../../modules/career-finder-slider/career-finder-slider.module';
import { PriceBoxModule } from './price-box/price-box.module';
import { TemplateCarouselModule } from '../../../modules/template-carousel/template-carousel.module';
import { TruncateModule } from 'ng2-truncate';
var CoachingPackageModule = /** @class */ (function () {
    function CoachingPackageModule() {
    }
    CoachingPackageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                CoachingPackageRoutingModule,
                FmpPlansModule,
                CareerFinderSliderModule,
                PriceBoxModule,
                FmpPlansModule,
                TemplateCarouselModule,
                TruncateModule
            ],
            providers: [
                CoachingPackageResolver
            ],
            declarations: [
                CoachingPackageComponent
            ],
            exports: [
                CoachingPackageComponent
            ]
        })
    ], CoachingPackageModule);
    return CoachingPackageModule;
}());
export { CoachingPackageModule };
