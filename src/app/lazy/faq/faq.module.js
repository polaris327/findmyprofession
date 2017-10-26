var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';
import { CommonModule } from '@angular/common';
import { FaqPageResolver } from './faq.resolver';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
var FaqModule = /** @class */ (function () {
    function FaqModule() {
    }
    FaqModule = __decorate([
        NgModule({
            imports: [
                FaqRoutingModule,
                CommonModule,
                NgbAccordionModule
            ],
            providers: [
                FaqPageResolver
            ],
            declarations: [
                FaqComponent
            ],
            exports: [
                FaqComponent
            ]
        })
    ], FaqModule);
    return FaqModule;
}());
export { FaqModule };
