var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscribeToArticleComponent } from './subscribe-to-article.component';
import { BlogArticleService } from '../blog-article.service';
import { SubscribeToArticleErrors } from './subscribe-to-article.model';
import { CircleIconLineModule } from '../../../modules/circle-icon-line/circle-icon-line.module';
import { ErrorModule } from "../../../modules/error/error.module";
var SubscribeToArticleModule = /** @class */ (function () {
    function SubscribeToArticleModule() {
    }
    SubscribeToArticleModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                CircleIconLineModule,
                ErrorModule
            ],
            providers: [
                BlogArticleService,
                SubscribeToArticleErrors
            ],
            declarations: [
                SubscribeToArticleComponent
            ],
            exports: [
                SubscribeToArticleComponent
            ]
        })
    ], SubscribeToArticleModule);
    return SubscribeToArticleModule;
}());
export { SubscribeToArticleModule };
