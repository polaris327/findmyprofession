var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordResetComponent } from './password-reset.component';
import { ResetPasswordErrors } from './password-reset.model';
import { PasswordResetService } from './password-reset.service';
import { RouterModule } from '@angular/router';
import { ErrorModule } from '../../modules/error/error.module';
var PasswordResetModule = /** @class */ (function () {
    function PasswordResetModule() {
    }
    PasswordResetModule = __decorate([
        NgModule({
            imports: [
                PasswordResetRoutingModule,
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule,
                ErrorModule
            ],
            providers: [
                ResetPasswordErrors,
                PasswordResetService
            ],
            declarations: [
                PasswordResetComponent
            ],
            exports: [
                PasswordResetComponent
            ]
        })
    ], PasswordResetModule);
    return PasswordResetModule;
}());
export { PasswordResetModule };
