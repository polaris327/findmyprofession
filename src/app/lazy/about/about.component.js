var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetaTags } from '../../core/services/meta-tags.service';
import { DOMAIN_URL } from '../../../main.config';
require('../../../assets/images/blue-bg/about-us.jpg');
var AboutComponent = /** @class */ (function () {
    function AboutComponent(route, metaService) {
        this.route = route;
        this.metaService = metaService;
        var data = route.snapshot.data.page;
        if (data.content) {
            this.pageData = data.content;
        }
        this.metaService.setMetaTags(data);
        this.metaService.setImages(DOMAIN_URL + "/src/assets/images/logo-og.png");
    }
    AboutComponent = __decorate([
        Component({
            selector: 'fmp-about-component',
            templateUrl: 'about.component.html',
            styles: [require('./about.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            MetaTags])
    ], AboutComponent);
    return AboutComponent;
}());
export { AboutComponent };
