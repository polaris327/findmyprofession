var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsRoutingModule } from './testimonials-routing.module';
import { TestimonialsComponent } from './testimonials.component';
import { TestimonialsService } from './testimonials.service';
import { TestimonialsPageDataResolver } from './testimonials.resolver';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingStarsModule } from '../../modules/rating-stars/rating-stars.module';
import { TruncateModule } from 'ng2-truncate';
import { CustomLinkModule } from '../../modules/custom-link/custom-link.module';
var TestimonialsModule = /** @class */ (function () {
    function TestimonialsModule() {
    }
    TestimonialsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                TestimonialsRoutingModule,
                NgbPaginationModule,
                RatingStarsModule,
                TruncateModule,
                CustomLinkModule
            ],
            providers: [
                TestimonialsPageDataResolver,
                TestimonialsService
            ],
            declarations: [
                TestimonialsComponent
            ],
            exports: [
                TestimonialsComponent
            ]
        })
    ], TestimonialsModule);
    return TestimonialsModule;
}());
export { TestimonialsModule };
