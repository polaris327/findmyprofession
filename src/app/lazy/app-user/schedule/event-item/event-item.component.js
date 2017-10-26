var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
var ScheduleEventItemComponent = /** @class */ (function () {
    function ScheduleEventItemComponent() {
        this.type = 'pending';
        this.onEventSchedule = new EventEmitter();
        this.onEventCancel = new EventEmitter();
        this.onEventComplete = new EventEmitter();
    }
    ScheduleEventItemComponent_1 = ScheduleEventItemComponent;
    ScheduleEventItemComponent.prototype.ngOnChanges = function (changes) {
        var event = changes['event'];
        if (event && event.currentValue) {
            this.event.start_time = ScheduleEventItemComponent_1.parseTime(new Date(this.event.start_time));
            this.event.end_time = ScheduleEventItemComponent_1.parseTime(new Date(this.event.end_time));
        }
    };
    ScheduleEventItemComponent.prototype.cancelEvent = function () {
        this.onEventCancel.emit(this.event);
    };
    ScheduleEventItemComponent.prototype.completeEvent = function () {
        this.onEventComplete.emit(this.event);
    };
    ScheduleEventItemComponent.prototype.scheduleCall = function () {
        this.onEventSchedule.emit(this.event);
    };
    ScheduleEventItemComponent.parseTime = function (date) {
        var localDate = new Date(date);
        var endHours = localDate.getUTCHours();
        localDate.setHours(endHours);
        return localDate.toString();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ScheduleEventItemComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScheduleEventItemComponent.prototype, "event", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ScheduleEventItemComponent.prototype, "onEventSchedule", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ScheduleEventItemComponent.prototype, "onEventCancel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ScheduleEventItemComponent.prototype, "onEventComplete", void 0);
    ScheduleEventItemComponent = ScheduleEventItemComponent_1 = __decorate([
        Component({
            selector: 'fmp-schedule-event-item',
            templateUrl: 'event-item.html'
        }),
        __metadata("design:paramtypes", [])
    ], ScheduleEventItemComponent);
    return ScheduleEventItemComponent;
    var ScheduleEventItemComponent_1;
}());
export { ScheduleEventItemComponent };
