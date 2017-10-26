var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { FmpPlansModule } from '../../../../modules/fmp-plans/fmp-plans.module';
import { PriceBoxComponent } from './price-box.component';
import { PriceBoxTabComponent } from './price-box-tab/price-box-tab.component';
import { CommonModule } from '@angular/common';
var PriceBoxModule = /** @class */ (function () {
    function PriceBoxModule() {
    }
    PriceBoxModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FmpPlansModule,
                NgbTabsetModule
            ],
            declarations: [
                PriceBoxComponent,
                PriceBoxTabComponent
            ],
            exports: [
                PriceBoxComponent
            ]
        })
    ], PriceBoxModule);
    return PriceBoxModule;
}());
export { PriceBoxModule };
