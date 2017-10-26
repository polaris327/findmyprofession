var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerFinderStepsModalComponent } from './career-finder-steps-modal.component';
import { CareerFinderStepsModule } from '../career-finder-steps/career-finder-steps.module';
import { CircleIconLineModule } from '../circle-icon-line/circle-icon-line.module';
import { CareerFinderSliderModule } from '../career-finder-slider/career-finder-slider.module';
import { ModelCloseIconModule } from '../modal-close-icon/modal-close-icon.module';
var CareerFinderStepsModalModule = /** @class */ (function () {
    function CareerFinderStepsModalModule() {
    }
    CareerFinderStepsModalModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                CareerFinderStepsModule,
                CircleIconLineModule,
                CareerFinderSliderModule,
                ModelCloseIconModule
            ],
            declarations: [
                CareerFinderStepsModalComponent
            ],
            entryComponents: [
                CareerFinderStepsModalComponent
            ],
            exports: [
                CareerFinderStepsModalComponent
            ]
        })
    ], CareerFinderStepsModalModule);
    return CareerFinderStepsModalModule;
}());
export { CareerFinderStepsModalModule };
