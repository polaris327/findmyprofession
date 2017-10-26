var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ProfileReferenceComponent } from './profile-references.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from '../../../../../modules/error/error.module';
import { ReferenceItemModule } from './reference-item/reference-item.module';
import { InputPhoneNumberModule } from '../../../../../modules/input-phone-number/input-phone-number.module';
var ProfileReferenceModule = /** @class */ (function () {
    function ProfileReferenceModule() {
    }
    ProfileReferenceModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                ErrorModule,
                ReferenceItemModule,
                InputPhoneNumberModule
            ],
            declarations: [
                ProfileReferenceComponent
            ],
            exports: [
                ProfileReferenceComponent
            ],
        })
    ], ProfileReferenceModule);
    return ProfileReferenceModule;
}());
export { ProfileReferenceModule };
