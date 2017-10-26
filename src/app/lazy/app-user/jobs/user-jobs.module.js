var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserJobsComponent } from './user-jobs.component';
import { UserJobsRoutingModule } from './user-jobs-routing.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { UserJobsService } from './user-jobs.service';
import { JobListModule } from './job-list/job-list.module';
import { UserJobsResolver } from './user-jobs.resolver';
var UserJobsModule = /** @class */ (function () {
    function UserJobsModule() {
    }
    UserJobsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                UserJobsRoutingModule,
                NgbTabsetModule,
                JobListModule
            ],
            providers: [
                UserJobsService,
                UserJobsResolver
            ],
            declarations: [
                UserJobsComponent
            ],
            exports: [
                UserJobsComponent
            ]
        })
    ], UserJobsModule);
    return UserJobsModule;
}());
export { UserJobsModule };
