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
import { Headers, URLSearchParams, Http, Request, Response, ResponseContentType } from '@angular/http';
import { UserService } from './user.service';
/**
 * Custom http service
 */
var HttpService = HttpService_1 = (function () {
    function HttpService(http, userService) {
        var _this = this;
        this.http = http;
        this.userService = userService;
        this.defaultError = {
            status: 'Fail',
            message: 'Server error.'
        };
        this.userService.user$
            .subscribe(function (user) {
            _this.userToken = user ? user.token : null;
        });
    }
    HttpService.prototype.sendRequest = function (options) {
        var body;
        switch (options.encoding) {
            case 'url':
                body = HttpService_1.urlEncodeBody(options.body);
                break;
            case 'fd':
                body = HttpService_1.formDataBody(options.body);
                break;
            default:
                body = options.body;
        }
        var request = new Request({
            method: options.method || 'GET',
            url: HttpService_1.getUrl(options),
            body: body,
            headers: HttpService_1.getHeaders(options.userToken ? this.userToken : null),
            params: options.searchParams ? HttpService_1.urlEncodeBody(options.searchParams) : null,
            responseType: this.getResponseContentType(options)
        });
        return this.processRequest(request, options);
    };
    HttpService.prototype.getResponseContentType = function (options) {
        if (options.isBlob) {
            return ResponseContentType.Blob;
        }
        if (options.isText) {
            return ResponseContentType.Text;
        }
        return ResponseContentType.Json;
    };
    HttpService.prototype.processRequest = function (req, options) {
        var _this = this;
        return this.http
            .request(req)
            .map(function (res) { return _this.mapContent(res, options); })
            .catch(this.errorHandler.bind(this));
    };
    HttpService.prototype.mapContent = function (res, options) {
        if (options.isBlob) {
            return res.blob();
        }
        if (options.isText) {
            return res._body.toString();
        }
        return res.json();
    };
    /**
     * Method to get Headers with user token provide
     * @returns {Headers}
     */
    HttpService.prototype.getHeadersWithToken = function () {
        var headers = new Headers();
        var user = this.userService.user$.getValue();
        if (user) {
            headers.set('token', this.userService.user$.getValue().token);
        }
        return headers;
    };
    HttpService.prototype.errorHandler = function (err) {
        if ((err instanceof Response) && HttpService_1.checkResType(err, 'json')) {
            var errObject = err.json();
            if (errObject && errObject.error) {
                errObject = errObject.error;
            }
            return Observable.throw(errObject || this.defaultError);
        }
        return Observable.throw(this.defaultError);
    };
    HttpService.urlEncodeBody = function (data) {
        var params = new URLSearchParams();
        Object.keys(data)
            .forEach(function (key) { return params.set(key, data[key]); });
        return params;
    };
    HttpService.formDataBody = function (data) {
        var fd = new FormData();
        Object.keys(data)
            .forEach(function (key) { return fd.append(key, data[key]); });
        return fd;
    };
    HttpService.checkResType = function (res, type) {
        if (type === void 0) { type = 'json'; }
        var resType = res.headers.get('Content-Type');
        return resType && (resType.indexOf(type) !== -1);
    };
    HttpService.getHeaders = function (token) {
        var headers = new Headers();
        if (token) {
            headers.append('token', token);
        }
        return headers;
    };
    HttpService.getUrl = function (options) {
        return options.absolutePath ? options.url : 'https://www.findmyprofession.com/api/v1' + options.url;
    };
    return HttpService;
}());
HttpService = HttpService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        UserService])
], HttpService);
export { HttpService };
var HttpService_1;
