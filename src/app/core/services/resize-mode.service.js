var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MODE_DESK, MODE_MOB } from '../models/core.model';
var ResizeModeService = /** @class */ (function () {
    function ResizeModeService() {
        this.mode$ = new BehaviorSubject(null);
    }
    Object.defineProperty(ResizeModeService.prototype, "windowWidth", {
        set: function (value) {
            if (value < 1025) {
                this.state = MODE_MOB;
            }
            else {
                this.state = MODE_DESK;
            }
        },
        enumerable: true,
        configurable: true
    });
    ResizeModeService.prototype.isDesk = function () {
        return this.state === MODE_DESK;
    };
    ResizeModeService.prototype.isMob = function () {
        return this.state === MODE_MOB;
    };
    Object.defineProperty(ResizeModeService.prototype, "state", {
        get: function () {
            return this.mode$.getValue();
        },
        set: function (value) {
            if (value === MODE_MOB || value === MODE_DESK) {
                this.mode$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    ResizeModeService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], ResizeModeService);
    return ResizeModeService;
}());
export { ResizeModeService };
