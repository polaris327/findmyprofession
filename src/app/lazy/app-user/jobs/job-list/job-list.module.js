var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list.component';
import { JobItemModule } from './job-item/job-item.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDropdownModule } from '../../../../modules/custom-dropdown/custom-dropdown.module';
import { CareerFinderStepsModule } from '../../../../modules/career-finder-steps/career-finder-steps.module';
var JobListModule = /** @class */ (function () {
    function JobListModule() {
    }
    JobListModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                JobItemModule,
                CustomDropdownModule,
                NgbPaginationModule,
                CareerFinderStepsModule
            ],
            declarations: [
                JobListComponent,
            ],
            exports: [
                JobListComponent
            ]
        })
    ], JobListModule);
    return JobListModule;
}());
export { JobListModule };
