var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FMPAppComponent } from './app.component';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BasketCartModule } from './modules/basket-cart/basket-card.module';
import { HomeModule } from './lazy/home/home.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlogArticleModule } from './lazy/blog-article/blog-article.module';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                HttpModule,
                TransferHttpModule,
                AppRoutingModule,
                CoreModule,
                BasketCartModule,
                HomeModule,
                NoopAnimationsModule,
                BlogArticleModule
            ],
            declarations: [FMPAppComponent],
            exports: [FMPAppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
