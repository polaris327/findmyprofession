var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutAdditionalPackagesComponent } from './additional-packages/additional-packages.component';
import { PromoCodeComponent } from './promo-code/promo-code.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPaymentInfoComponent } from './payment-info/payment-info.component';
import { TextMaskModule } from 'angular2-text-mask';
import { CheckoutSignInModule } from './sign-in/checkout-sign-in.module';
import { PaymentInfoValidator } from './payment-info/payment-info.validator';
import { CheckoutService } from './checkout.service';
import { SignUpModule } from './sign-up/sign-up.module';
import { CheckoutPageResolver } from './chekout.resolver';
import { ErrorModule } from '../../modules/error/error.module';
import { CustomLinkModule } from '../../modules/custom-link/custom-link.module';
var CheckoutModule = /** @class */ (function () {
    function CheckoutModule() {
    }
    CheckoutModule = __decorate([
        NgModule({
            imports: [
                CheckoutRoutingModule,
                CommonModule,
                FormsModule,
                TextMaskModule,
                ReactiveFormsModule,
                CheckoutSignInModule,
                SignUpModule,
                ErrorModule,
                CustomLinkModule
            ],
            providers: [
                CheckoutPageResolver,
                PaymentInfoValidator,
                CheckoutService
            ],
            declarations: [
                CheckoutComponent,
                CheckoutAdditionalPackagesComponent,
                PromoCodeComponent,
                CheckoutPaymentInfoComponent
            ],
            exports: [
                CheckoutComponent
            ]
        })
    ], CheckoutModule);
    return CheckoutModule;
}());
export { CheckoutModule };
