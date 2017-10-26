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
var TestimonialsMinHolderComponent = /** @class */ (function () {
    function TestimonialsMinHolderComponent() {
        this.onTestimonialOpen = new EventEmitter();
    }
    TestimonialsMinHolderComponent.prototype.openTestimonial = function (event) {
        event.preventDefault();
        this.onTestimonialOpen.emit(this.currentSlide);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TestimonialsMinHolderComponent.prototype, "currentSlide", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TestimonialsMinHolderComponent.prototype, "onTestimonialOpen", void 0);
    TestimonialsMinHolderComponent = __decorate([
        Component({
            selector: 'testimonial-min-holder-component',
            templateUrl: 'testimonial-min-holder.component.html',
            styles: [require('./testimonial-min-holder.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], TestimonialsMinHolderComponent);
    return TestimonialsMinHolderComponent;
}());
export { TestimonialsMinHolderComponent };
