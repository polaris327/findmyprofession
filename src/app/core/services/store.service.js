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
import { MemoryService } from './memory.service';
var StoreService = /** @class */ (function () {
    function StoreService(memoryService) {
        this.memoryService = memoryService;
    }
    StoreService.prototype.getItem = function (key) {
        try {
            return JSON.parse(sessionStorage.getItem(key)) || JSON.parse(localStorage.getItem(key));
        }
        catch (err) {
            return JSON.parse(this.memoryService.getItem(key));
        }
    };
    StoreService.prototype.setItem = function (key, valueObj, remember) {
        if (remember === void 0) { remember = true; }
        try {
            if (remember) {
                localStorage.setItem(key, JSON.stringify(valueObj));
            }
            else {
                sessionStorage.setItem(key, JSON.stringify(valueObj));
            }
        }
        catch (err) {
            this.memoryService.setItem(key, JSON.stringify(valueObj));
        }
    };
    StoreService.prototype.removeItem = function (key) {
        try {
            sessionStorage.removeItem(key);
            localStorage.removeItem(key);
        }
        catch (err) {
            this.memoryService.removeItem(key);
        }
    };
    StoreService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MemoryService])
    ], StoreService);
    return StoreService;
}());
export { StoreService };
