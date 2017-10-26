var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetaTags } from '../../core/services/meta-tags.service';
require('../../../assets/images/blue-bg/faq.jpg');
var FaqComponent = /** @class */ (function () {
    function FaqComponent(route, metaService) {
        this.route = route;
        this.metaService = metaService;
        var data = route.snapshot.data['pageData'];
        if (data) {
            this.pageData = data.content;
            this.metaService.setMetaTags(data);
        }
    }
    FaqComponent = __decorate([
        Component({
            selector: 'faq-component',
            templateUrl: 'faq.component.html'
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            MetaTags])
    ], FaqComponent);
    return FaqComponent;
}());
export { FaqComponent };
