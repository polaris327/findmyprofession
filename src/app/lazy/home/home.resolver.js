var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
import { HOME_PAGE_DATA } from '../../core/models/api-urls.model';
import { UserAuthGuard } from '../../core/guards/user-auth.guard';
/**
 * Service to get data before home page is loaded
 */
var HomePageDataResolver = /** @class */ (function () {
    function HomePageDataResolver(http, authGuard) {
        this.http = http;
        this.authGuard = authGuard;
    }
    /**
     * Method to get page data
     * @param route
     * @returns {Observable<IHomePageData>}
     */
    HomePageDataResolver.prototype.resolve = function (route) {
        if (this.authGuard.canActivate()) {
            return this.http.get(TransferHttp.getUrl(HOME_PAGE_DATA, true));
        }
        return Observable.of(null);
    };
    HomePageDataResolver = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [TransferHttp,
            UserAuthGuard])
    ], HomePageDataResolver);
    return HomePageDataResolver;
}());
export { HomePageDataResolver };
