var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendlyComponent } from '../calendly/calendly.component';
import { Router } from '@angular/router';
var CareerFinderStepsModalComponent = /** @class */ (function () {
    function CareerFinderStepsModalComponent(modalService, activeModal, router) {
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.router = router;
        this.step = 0;
    }
    CareerFinderStepsModalComponent.prototype.goToStep = function (step) {
        this.step = step;
    };
    CareerFinderStepsModalComponent.prototype.cancel = function () {
        this.activeModal.close();
    };
    CareerFinderStepsModalComponent.prototype.openCalendly = function () {
        this.activeModal.close();
        var modal = this.modalService.open(CalendlyComponent, {
            size: 'lg'
        });
        if (modal) {
            modal.componentInstance.type = 'career-finder-intro';
        }
    };
    CareerFinderStepsModalComponent.prototype.openCareerFinderDetails = function ($event) {
        $event.event.preventDefault();
        this.activeModal.close();
        this.router.navigate([$event.url]);
    };
    CareerFinderStepsModalComponent = __decorate([
        Component({
            selector: 'fmp-career-finder-steps-modal',
            templateUrl: 'career-finder-steps-modal.html',
            styles: [require('./career-finder-steps-modal.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [NgbModal,
            NgbActiveModal,
            Router])
    ], CareerFinderStepsModalComponent);
    return CareerFinderStepsModalComponent;
}());
export { CareerFinderStepsModalComponent };
