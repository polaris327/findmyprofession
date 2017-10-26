var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsPageDataResolver } from './contact-us.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLinksModule } from '../../modules/social-links/social-links.module';
import { ContactUsService } from './contact-us.service';
import { ContactUsErrors } from './contact-us.model';
import { ErrorModule } from '../../modules/error/error.module';
var ContactUsModule = /** @class */ (function () {
    function ContactUsModule() {
    }
    ContactUsModule = __decorate([
        NgModule({
            imports: [
                ContactUsRoutingModule,
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                SocialLinksModule,
                ErrorModule
            ],
            providers: [
                ContactUsPageDataResolver,
                ContactUsService,
                ContactUsErrors
            ],
            declarations: [
                ContactUsComponent
            ],
            exports: [
                ContactUsComponent
            ]
        })
    ], ContactUsModule);
    return ContactUsModule;
}());
export { ContactUsModule };
