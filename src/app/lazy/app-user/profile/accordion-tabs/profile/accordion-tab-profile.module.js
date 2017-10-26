var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionTabProfileComponent } from './accordion-tab-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputPhoneNumberModule } from '../../../../../modules/input-phone-number/input-phone-number.module';
import { AccordionTabProfileErrors } from './accordion-tab-profile.model';
import { ErrorModule } from '../../../../../modules/error/error.module';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { CalendarModule } from 'primeng/primeng';
var AccordionTabProfileModule = /** @class */ (function () {
    function AccordionTabProfileModule() {
    }
    AccordionTabProfileModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                InputPhoneNumberModule,
                ErrorModule,
                GooglePlaceModule,
                CalendarModule
            ],
            providers: [
                AccordionTabProfileErrors
            ],
            declarations: [
                AccordionTabProfileComponent
            ],
            exports: [
                AccordionTabProfileComponent
            ]
        })
    ], AccordionTabProfileModule);
    return AccordionTabProfileModule;
}());
export { AccordionTabProfileModule };
