var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionTabCareerPreferencesComponent } from './career-preferences.component';
import { RlTagInputModule } from 'angular2-tag-input/dist';
import { CustomDropdownModule } from '../../../../../modules/custom-dropdown/custom-dropdown.module';
var CareerPreferencesModule = /** @class */ (function () {
    function CareerPreferencesModule() {
    }
    CareerPreferencesModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                CustomDropdownModule,
                RlTagInputModule
            ],
            declarations: [
                AccordionTabCareerPreferencesComponent
            ],
            exports: [
                AccordionTabCareerPreferencesComponent
            ]
        })
    ], CareerPreferencesModule);
    return CareerPreferencesModule;
}());
export { CareerPreferencesModule };
