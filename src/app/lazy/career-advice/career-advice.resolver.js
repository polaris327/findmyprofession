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
import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
/**
 * Service to get data before home page is loaded
 */
var CareerAdviceDataResolver = /** @class */ (function () {
    function CareerAdviceDataResolver(http) {
        this.http = http;
    }
    /**
     * Method to get page data
     * @param snapshot
     * @param state
     * @returns {Observable<any>}
     */
    CareerAdviceDataResolver.prototype.resolve = function (snapshot, state) {
        var page = 1;
        if (snapshot.queryParams && Number.isInteger(+snapshot.queryParams.paged)) {
            page = +snapshot.queryParams.paged;
        }
        var url = state.url;
        if (/\/resume-cover-letter/.test(url)) {
            url = '/resume';
        }
        return this.http.get(TransferHttp.getUrl("/blog" + url, true), { params: { page: page } });
    };
    CareerAdviceDataResolver = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [TransferHttp])
    ], CareerAdviceDataResolver);
    return CareerAdviceDataResolver;
}());
export { CareerAdviceDataResolver };
