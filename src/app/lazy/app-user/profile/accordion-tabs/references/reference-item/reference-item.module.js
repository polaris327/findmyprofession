var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReferenceItemComponent } from './reference-item.component';
import { ErrorModule } from '../../../../../../modules/error/error.module';
import { InputPhoneNumberModule } from '../../../../../../modules/input-phone-number/input-phone-number.module';
import { ProfileTabSettingsModule } from "../../../profile-tab-settings/profile-tab-settings.module";
var ReferenceItemModule = /** @class */ (function () {
    function ReferenceItemModule() {
    }
    ReferenceItemModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                ErrorModule,
                InputPhoneNumberModule,
                ProfileTabSettingsModule
            ],
            declarations: [
                ReferenceItemComponent
            ],
            exports: [
                ReferenceItemComponent
            ],
        })
    ], ReferenceItemModule);
    return ReferenceItemModule;
}());
export { ReferenceItemModule };
