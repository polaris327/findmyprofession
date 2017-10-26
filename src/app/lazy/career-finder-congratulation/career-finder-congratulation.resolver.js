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
import { HttpService } from '../../core/services/http.service';
var CongratulationCareerFinderResolver = /** @class */ (function () {
    function CongratulationCareerFinderResolver(httpService) {
        this.httpService = httpService;
    }
    /**
     * Method to get page data
     * @param route
     * @returns {Observable<Array<ICareerFinderPackage>>}
     */
    CongratulationCareerFinderResolver.prototype.resolve = function (route) {
        return this.httpService.sendRequest({
            url: '/congratulation'
        });
    };
    CongratulationCareerFinderResolver = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpService])
    ], CongratulationCareerFinderResolver);
    return CongratulationCareerFinderResolver;
}());
export { CongratulationCareerFinderResolver };
