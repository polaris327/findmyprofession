var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
var ProfileProgressComponent = /** @class */ (function () {
    function ProfileProgressComponent() {
        this.onProgressTaskOpen = new EventEmitter();
        this.tasks = [];
    }
    ProfileProgressComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.progress && this.progress.values) {
            var _tasks_1 = [];
            Object.keys(this.progress.values).forEach(function (item) {
                if (_this.progress.values[item]) {
                    _tasks_1.push({
                        title: _this.progress.values[item],
                        field: item
                    });
                }
            });
            this.tasks = _tasks_1;
        }
    };
    ProfileProgressComponent.prototype.openTask = function (key) {
        this.onProgressTaskOpen.emit(key);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ProfileProgressComponent.prototype, "progress", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ProfileProgressComponent.prototype, "onProgressTaskOpen", void 0);
    ProfileProgressComponent = __decorate([
        Component({
            selector: 'fmp-profile-progress-component',
            templateUrl: 'profile-progress.html',
            styles: [require('./profile-progress.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], ProfileProgressComponent);
    return ProfileProgressComponent;
}());
export { ProfileProgressComponent };
