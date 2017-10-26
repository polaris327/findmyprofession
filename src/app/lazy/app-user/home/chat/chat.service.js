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
import { HttpService } from '../../../../core/services/http.service';
import { MESSAGES_UPDATE, SEND_MESSAGE } from '../../../../core/models/api-urls.model';
import { DOMAIN_URL } from '../../../../../main.config';
var ChatService = /** @class */ (function () {
    function ChatService(httpService) {
        this.httpService = httpService;
    }
    /**
     * Method to send message
     * @param message
     * @returns {Observable<IChatMessage | IErrorResponse>}
     */
    ChatService.prototype.sendMessage = function (message) {
        var request = {
            method: 'POST',
            url: SEND_MESSAGE,
            body: message,
            encoding: 'fd',
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method to get new messages
     * @returns {Observable<any>}
     */
    ChatService.prototype.getNewMessages = function () {
        var request = {
            url: MESSAGES_UPDATE,
            userToken: true
        };
        return this.httpService.sendRequest(request);
    };
    /**
     * Method to
     * @param fileSrc
     * @returns {Observable<string | IErrorResponse>}
     */
    ChatService.prototype.downloadFile = function (fileSrc) {
        var request = {
            url: "" + DOMAIN_URL + fileSrc,
            userToken: true,
            absolutePath: true,
            isBlob: true
        };
        return this.httpService.sendRequest(request);
    };
    ChatService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpService])
    ], ChatService);
    return ChatService;
}());
export { ChatService };
