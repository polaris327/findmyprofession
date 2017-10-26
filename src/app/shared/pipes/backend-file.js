var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from '@angular/core';
import { DOMAIN_URL, PORT } from '../../../main.config';
var FileUploadPipe = /** @class */ (function () {
    function FileUploadPipe() {
        this.domain = DOMAIN_URL;
    }
    FileUploadPipe.prototype.transform = function (url) {
        if (url === void 0) { url = ''; }
        if (!url) {
            return url;
        }
        var dotsIndex = url.lastIndexOf(PORT.back.toString());
        if (dotsIndex !== -1) {
            return this.domain + "/" + url.substring(dotsIndex + PORT.back.toString().length + 1, url.length);
        }
        else {
            return url;
        }
    };
    FileUploadPipe = __decorate([
        Pipe({ name: 'uploads' }),
        __metadata("design:paramtypes", [])
    ], FileUploadPipe);
    return FileUploadPipe;
}());
export { FileUploadPipe };
