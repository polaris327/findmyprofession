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
import { PlatformCheckService } from './platform-check.service';
import { parse } from 'url';
var FileSaver = require('file-saver');
var CoreUtilitiesService = /** @class */ (function () {
    function CoreUtilitiesService(platformService) {
        this.platformService = platformService;
    }
    CoreUtilitiesService_1 = CoreUtilitiesService;
    CoreUtilitiesService.prototype.openArticleInNewTab = function (articleUrl) {
        if (this.platformService.isBrowser) {
            var newWindowName = "window" + Math.random();
            window.open(location.origin + "/career-advice/" + articleUrl, newWindowName, '_target');
        }
    };
    /**
     * Method to save file from server
     * @param data
     * @param fileName
     */
    CoreUtilitiesService.saveFile = function (data, fileName) {
        var blob = new Blob([data]);
        FileSaver.saveAs(blob, fileName);
    };
    CoreUtilitiesService.checkFileExtension = function (file) {
        return file ? CoreUtilitiesService_1.fileFormats.some(function (ext) { return ext === file.type; }) : false;
    };
    CoreUtilitiesService.prototype.detectEdge = function () {
        return this.detectBrowser('Edge/');
    };
    CoreUtilitiesService.prototype.detectFirefox = function () {
        return this.detectBrowser('Firefox');
    };
    CoreUtilitiesService.prototype.detectBrowser = function (type) {
        if (this.platformService.isBrowser) {
            var agent = window.navigator.userAgent;
            return agent.indexOf(type) > 0;
        }
        return false;
    };
    CoreUtilitiesService.parseMessage = function (message) {
        return message.replace(/\n/g, '<br/>');
    };
    /**
     * Method to parse job link
     * @param {string} link
     * @returns {string}
     */
    CoreUtilitiesService.parseJobLink = function (link) {
        var parsedUrl = parse(link);
        return parsedUrl.protocol + "//" + parsedUrl.host;
    };
    CoreUtilitiesService.removeSpaces = function (str) {
        if (str === void 0) { str = ''; }
        return str.replace(/\s/g, '');
    };
    CoreUtilitiesService.removeTrallingSlash = function (str) {
        if (str === void 0) { str = ''; }
        return str.replace(/\/$/, "");
    };
    CoreUtilitiesService.getTimeZone = function () {
        var offsetInHours = -new Date().getTimezoneOffset() / 60;
        return "GMT" + (offsetInHours > 0 ? '+' : '') + offsetInHours;
    };
    CoreUtilitiesService.fileFormats = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/pdf',
        'text/plain',
        'application/rtf',
        'image/png',
        'image/jpeg'
    ];
    CoreUtilitiesService.fileAcceptFormats = [
        '.docx',
        '.doc',
        '.pdf',
        '.rtf',
        '.txt',
        '.png',
        '.jpeg',
        '.jpg'
    ];
    CoreUtilitiesService = CoreUtilitiesService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [PlatformCheckService])
    ], CoreUtilitiesService);
    return CoreUtilitiesService;
    var CoreUtilitiesService_1;
}());
export { CoreUtilitiesService };
