var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { SignInRoutingModule } from './signin-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './signin.component';
import { SignInErrors } from './signin.model';
import { SignInService } from './signin.service';
import { ErrorModule } from '../../modules/error/error.module';
import { CustomLinkModule } from '../../modules/custom-link/custom-link.module';
var SignInModule = /** @class */ (function () {
    function SignInModule() {
    }
    SignInModule = __decorate([
        NgModule({
            imports: [
                SignInRoutingModule,
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                ErrorModule,
                CustomLinkModule
            ],
            providers: [
                SignInErrors,
                SignInService
            ],
            declarations: [
                SignInComponent
            ],
            exports: [
                SignInComponent
            ]
        })
    ], SignInModule);
    return SignInModule;
}());
export { SignInModule };
