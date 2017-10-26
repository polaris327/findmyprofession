var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { Page404Component } from './page-404.component';
import { Page404RoutingModule } from './page-404-routing.module';
var Page404Module = /** @class */ (function () {
    function Page404Module() {
    }
    Page404Module = __decorate([
        NgModule({
            declarations: [
                Page404Component
            ],
            imports: [
                Page404RoutingModule
            ]
        })
    ], Page404Module);
    return Page404Module;
}());
export { Page404Module };
