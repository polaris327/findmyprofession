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
import { RESET_PASS, RESET_PASS_EMAIL } from '../../core/models/api-urls.model';
var PasswordResetService = /** @class */ (function () {
    function PasswordResetService(httpService) {
        this.httpService = httpService;
    }
    /**
     * Method to send email to reset password
     * @param email
     * @returns {Observable<any>|null}
     */
    PasswordResetService.prototype.sendEmail = function (email) {
        var request = {
            method: 'Post',
            url: RESET_PASS_EMAIL,
            body: { email: email }
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method to set new password
     * @param body
     * @returns {Observable<any>|null}
     */
    PasswordResetService.prototype.resetPassword = function (body) {
        var request = {
            method: 'Post',
            url: RESET_PASS,
            body: body
        };
        return this.httpService.sendRequest(request);
    };
    PasswordResetService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpService])
    ], PasswordResetService);
    return PasswordResetService;
}());
export { PasswordResetService };
