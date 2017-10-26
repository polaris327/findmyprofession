var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { PrivacyPolicyTermsRoutingModule } from './privacy-policy-terms-routing.module';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyTermsComponent } from './privacy-policy-terms.component';
import { PrivacyTermsPageDataResolver } from './privacy-policy-terms.resolver';
var PrivacyPolicyTermsModule = /** @class */ (function () {
    function PrivacyPolicyTermsModule() {
    }
    PrivacyPolicyTermsModule = __decorate([
        NgModule({
            imports: [
                PrivacyPolicyTermsRoutingModule,
                CommonModule
            ],
            providers: [
                PrivacyTermsPageDataResolver
            ],
            declarations: [
                PrivacyPolicyTermsComponent
            ],
            exports: [
                PrivacyPolicyTermsComponent
            ]
        })
    ], PrivacyPolicyTermsModule);
    return PrivacyPolicyTermsModule;
}());
export { PrivacyPolicyTermsModule };
