var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserScheduleRoutingModule } from './user-schedule-routing.module';
import { UserScheduleComponent } from './user-schedule.component';
import { UserScheduleResolver } from './user-schedule.resolver';
import { UserScheduleService } from './user-schedule.service';
import { ScheduleEventItemComponent } from './event-item/event-item.component';
var UserScheduleModule = /** @class */ (function () {
    function UserScheduleModule() {
    }
    UserScheduleModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                UserScheduleRoutingModule
            ],
            providers: [
                UserScheduleResolver,
                UserScheduleService
            ],
            declarations: [
                UserScheduleComponent,
                ScheduleEventItemComponent
            ],
            exports: [
                UserScheduleComponent
            ]
        })
    ], UserScheduleModule);
    return UserScheduleModule;
}());
export { UserScheduleModule };
