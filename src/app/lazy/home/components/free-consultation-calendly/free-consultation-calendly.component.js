var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation } from '@angular/core';
var FreeConsultationComponent = /** @class */ (function () {
    function FreeConsultationComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FreeConsultationComponent.prototype, "content", void 0);
    FreeConsultationComponent = __decorate([
        Component({
            selector: 'fmp-free-consultation-calendly-component',
            templateUrl: 'free-consultation-calendly.html',
            styles: [require('./free-consultation-calendly.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], FreeConsultationComponent);
    return FreeConsultationComponent;
}());
export { FreeConsultationComponent };
