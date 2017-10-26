var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoachingPackagesHolderRoutingModule } from './coaching-packages-routing-holder.module';
import { CoachingPackagesHolderComponent } from './coaching-packages-holder.component';
import { CoachingPackagesHolderResolver } from './coaching-packages-holder.resolver';
var CoachingPackagesHolderModule = /** @class */ (function () {
    function CoachingPackagesHolderModule() {
    }
    CoachingPackagesHolderModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule,
                CoachingPackagesHolderRoutingModule
            ],
            declarations: [
                CoachingPackagesHolderComponent
            ],
            providers: [
                CoachingPackagesHolderResolver
            ],
            exports: [
                CoachingPackagesHolderComponent
            ]
        })
    ], CoachingPackagesHolderModule);
    return CoachingPackagesHolderModule;
}());
export { CoachingPackagesHolderModule };
