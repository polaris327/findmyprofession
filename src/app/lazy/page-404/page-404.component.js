var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var Page404Component = /** @class */ (function () {
    function Page404Component() {
    }
    Page404Component = __decorate([
        Component({
            selector: 'fmp-404',
            templateUrl: './page-404.component.html',
            styles: [require('./page-404.component.scss').toString()]
        })
    ], Page404Component);
    return Page404Component;
}());
export { Page404Component };
