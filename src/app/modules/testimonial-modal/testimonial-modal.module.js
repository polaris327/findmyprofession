var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CircleIconLineModule } from "../circle-icon-line/circle-icon-line.module";
import { ModelCloseIconModule } from '../modal-close-icon/modal-close-icon.module';
import { TestimonialModalComponent } from './testimonial-modal.component';
import { RatingStarsModule } from '../rating-stars/rating-stars.module';
import { TruncateModule } from 'ng2-truncate';
var TestimonialModalModule = /** @class */ (function () {
    function TestimonialModalModule() {
    }
    TestimonialModalModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                NgbModalModule,
                CircleIconLineModule,
                RouterModule,
                ModelCloseIconModule,
                RatingStarsModule,
                TruncateModule
            ],
            exports: [
                TestimonialModalComponent
            ],
            declarations: [
                TestimonialModalComponent
            ],
            entryComponents: [
                TestimonialModalComponent
            ]
        })
    ], TestimonialModalModule);
    return TestimonialModalModule;
}());
export { TestimonialModalModule };
